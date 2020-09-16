const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

//Express stuff
const port = 4001
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const CommercialPaper = require('../../magnetocorp/contract/lib/paper.js');

async function buy (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../identity/user/venkat/wallet');


    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'venkat';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org4.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: true, asLocalhost: true }

        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})

        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use org.papernet.commercialpaper smart contract.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.papernet.commercialpaper smart contract.`})

        const contract = await network.getContract('papercontract', 'org.papernet.commercialpaper');

        // buy commercial paper
        console.log('Submit commercial paper buy transaction.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Submit commercial paper buy transaction.`})

        const buyResponse = await contract.submitTransaction(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);

        // process response
        console.log('Process buy transaction response.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Process buy transaction response.`})

        let paper = CommercialPaper.fromBuffer(buyResponse);

        console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully purchased by ${paper.owner}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`${paper.issuer} commercial paper : ${paper.paperNumber} successfully purchased by ${paper.owner}`})

        console.log('Transaction complete.');
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}

async function redeem (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../identity/user/venkat/wallet');
      
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
  
    // Main try/catch block
    try {
  
      // Specify userName for network access
          // Specify userName for network access
          const userName = 'venkat';
  
      // Load connection profile; will be used to locate a gateway
      let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org4.yaml', 'utf8'));
  
      // Set connection options; identity and wallet
      let connectionOptions = {
        identity: userName,
        wallet: wallet,
        discovery: { enabled:true, asLocalhost: true }
      };
  
      // Connect to gateway using application specified parameters
      console.log('Connect to Fabric gateway.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
  
      await gateway.connect(connectionProfile, connectionOptions);
  
      // Access PaperNet network
      console.log('Use network channel: mychannel.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})
  
      const network = await gateway.getNetwork('mychannel');
  
      // Get addressability to commercial paper contract
      console.log('Use org.papernet.commercialpaper smart contract.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Use org.papernet.commercialpaper smart contract.`})

      const contract = await network.getContract('papercontract', 'org.papernet.commercialpaper');
  
      // redeem commercial paper
      console.log('Submit commercial paper redeem transaction.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Submit commercial paper redeem transaction.`})

      const redeemResponse = await contract.submitTransaction(args[0], args[1], args[2], args[3], args[4]);
  
      // process response
      console.log('Process redeem transaction response.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Process buy transaction response.`})
  
      let paper = CommercialPaper.fromBuffer(redeemResponse);
  
      console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully redeemed with ${paper.owner}`);
      socket.emit('RESPONSE', {type:'FEED', payload:`${paper.issuer} commercial paper : ${paper.paperNumber} successfully redeemed with ${paper.owner}`})

      console.log('Transaction complete.');
      socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})
  
    } catch (error) {
  
      console.log(`Error processing transaction. ${error}`);
      socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
      console.log(error.stack);
  
    } finally {
  
      // Disconnect from the gateway
      console.log('Disconnect from Fabric gateway.')
      gateway.disconnect();
  
    }
}

io.on('connection', socket => {

    console.log(`Connected to client with Socket ID ${socket.id}`)
    socket.emit('RESPONSE', {type: 'FEED', payload: `Connected to server with socket ID ${socket.id}`})

    socket.on('REQUEST', (req) => {
        switch (req.action) {
            case "BUY":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for ${req.data.paperNumber} received`});
                buy(
                    {
                        args: [req.data.action, req.data.issuer, req.data.paperNumber, req.data.currentowner, req.data.newowner, req.data.price, req.data.buy_dt]
                    }
                ,socket);
                break;
            case "REDEEM":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for REDEEM received`});
                redeem(
                    {
                        args: [req.data.action, req.data.issuer, req.data.paperNumber, req.data.redeemingowner, req.data.redeem_dt]   
                    }                    
                ,socket);
                break;
        }
    })

    socket.on('disconnect', () => {
        console.log(`Disconnected to client ${socket.id}`)
    })

})

server.listen(port, () => console.log(`Listening on port ${port}`))