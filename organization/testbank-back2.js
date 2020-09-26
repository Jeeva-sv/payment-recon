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
const PaymentRecon = require('./bankofgotham/contract/lib/check.js');

async function Pay (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(
        "./bankofgotham/identity/user/jeeva/wallet"
      );
    
      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();
    
      // Main try/catch block
      try {
        // Specify userName for network access
        const userName = "jeeva";
    
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(
          fs.readFileSync("./bankofgotham/gateway/connection-org1.yaml", "utf8")
        );
    
        // Set connection options; identity and wallet
        let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled: true, asLocalhost: true },
        };
    
        // Connect to gateway using application specified parameters
        console.log("Connect to Fabric gateway.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
    
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Access Recon network
        console.log("Use network channel: mychannel.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})
    
        const network = await gateway.getNetwork("mychannel");
    
        // Get addressability to payment reconciliation contract
        console.log("Use org.reconnet.paymentrecon smart contract.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.reconnet.paymentrecon smart contract.`})
    
        const contract = await network.getContract("checkcontract");
    
        // const contract = await network.getContract(
        //   "checkcontract",
        //   "org.reconnet.paymentrecon"
        // );
    
        // submit paid transaction
        console.log("Submit Paid transaction of the check.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Submit Paid transaction of the check.`})
    
        const payResponse = await contract.submitTransaction(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7]
        );
        // process response
        console.log("Process pay transaction response.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Process pay transaction response.`})
    
        let check = PaymentRecon.fromBuffer(payResponse);

        console.log("Check details");
        console.log(check);
    
        console.log(
          `${check.issuer} check : ${check.checkNumber} successfully paid by ${check.owner}`
        );
        socket.emit('RESPONSE', {type:'FEED', payload:`${check.issuer} check : ${check.checkNumber} successfully paid by ${check.owner}`})

        console.log("Transaction complete.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
        console.log(error.stack);
      } finally {
        // Disconnect from the gateway
        console.log("Disconnect from Fabric gateway.");
        gateway.disconnect();
      }
    }

async function Reissuereq (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(
        "./gothamgeneralhospital/identity/user/venkat/wallet"
      );
    
      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();
    
      // Main try/catch block
      try {
        // Specify userName for network access
        const userName = "venkat";
    
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(
          fs.readFileSync("./gothamgeneralhospital/gateway/connection-org4.yaml", "utf8")
        );
    
        // Set connection options; identity and wallet
        let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled: true, asLocalhost: true },
        };
    
        // Connect to gateway using application specified parameters
        console.log("Connect to Fabric gateway.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
    
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Access Recon network
        console.log("Use network channel: mychannel.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})

        const network = await gateway.getNetwork("mychannel");
    
        // Get addressability to payment reconciliation contract
        console.log("Use org.reconnet.paymentrecon smart contract.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.reconnet.paymentrecon smart contract.`})
    
        const contract = await network.getContract("checkcontract");
    
        // const contract = await network.getContract(
        //   "checkcontract",
        //   "org.reconnet.paymentrecon"
        // );
    
        // submit paid transaction
        console.log("Submit Paid transaction of the check.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Submit Paid transaction of the check.`})
    
        const validateResponse = await contract.submitTransaction(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5]
        );
        // process response
        console.log("Process Reissue request transaction response.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Process pay transaction response.`})
    
        let check = PaymentRecon.fromBuffer(validateResponse);

        console.log("Check details");
        console.log(check);
    
        console.log(
          `${check.issuer} check : ${check.checkNumber} has been requested for reissue successfully`
        );
        socket.emit('RESPONSE', {type:'FEED', payload:`${check.issuer} check : ${check.checkNumber} has been requested for reissue successfully`})

        console.log("Transaction complete.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
        console.log(error.stack);
      } finally {
        // Disconnect from the gateway
        console.log("Disconnect from Fabric gateway.");
        gateway.disconnect();
    }
}

async function Validate (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(
        "./gothamgeneralhospital/identity/user/venkat/wallet"
      );
    
      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();
    
      // Main try/catch block
      try {
        // Specify userName for network access
        const userName = "venkat";
    
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(
          fs.readFileSync("./gothamgeneralhospital/gateway/connection-org4.yaml", "utf8")
        );
    
        // Set connection options; identity and wallet
        let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled: true, asLocalhost: true },
        };
    
        // Connect to gateway using application specified parameters
        console.log("Connect to Fabric gateway.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
    
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Access Reconnet network
        console.log("Use network channel: mychannel.");
    
        const network = await gateway.getNetwork("mychannel");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})
    
        // Get addressability to payment reconciliation contract
        console.log("Use org.reconnet.paymentrecon smart contract.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.reconnet.paymentrecon smart contract.`})
    
        const contract = await network.getContract("checkcontract");
    
        // const contract = await network.getContract(
        //   "checkcontract",
        //   "org.reconnet.paymentrecon"
        // );
    
        // submit paid transaction
        console.log("Validate the status of the check");
        socket.emit('RESPONSE', {type:'FEED', payload:`Validate the status of the check`})
    
        const validateResponse = await contract.submitTransaction(
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
            args[5]
        );
        // process response
        console.log("Process validate transaction response.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Process validate transaction response.`})
    
        let check = PaymentRecon.fromBuffer(validateResponse);
        console.log("Check details");
        console.log(check);
    
        console.log(
          `${check.issuer} check : ${check.checkNumber} successfully validated`
        );
        socket.emit('RESPONSE', {type:'FEED', payload:`${check.issuer} check : ${check.checkNumber} successfully validated`})

        console.log("Transaction complete.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
        console.log(error.stack);
      } finally {
        // Disconnect from the gateway
        console.log("Disconnect from Fabric gateway.");
        gateway.disconnect();
    }
}

async function Issue (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(
        "./waynehealth/identity/user/elayabharathi/wallet"
      );
    
      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();
    
      // Main try/catch block
      try {
        // Specify userName for network access
        // const userName = 'elayabharathi.elayaperumal@waynehealth.com';
        const userName = "elayabharathi";
    
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(
          fs.readFileSync("./waynehealth/gateway/connection-org2.yaml", "utf8")
        );
    
        // Set connection options; identity and wallet
        let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled: true, asLocalhost: true },
        };
    
        // Connect to gateway using application specified parameters
        console.log("Connect to Fabric gateway.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
    
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Access PaperNet network
        console.log("Use network channel: mychannel.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})

        const network = await gateway.getNetwork("mychannel");
    
        // Get addressability to commercial paper contract
        console.log("Use org.reconnet.paymentrecon smart contract.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.reconnet.paymentrecon smart contract.`})
    
        const contract = await network.getContract("checkcontract");
    
        // issue check payments
        console.log("Submit payment reconciliation issue transaction.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Submit payment reconciliation issue transaction`})

        const issueResponse = await contract.submitTransaction(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7],
          args[8],
          args[9],
          args[10],
          args[11],
          args[12]
        );
        // process response
        console.log("Process issue transaction response." + issueResponse);
        socket.emit('RESPONSE', {type:'FEED', payload:`Process issue transaction response." + ${issueResponse}`})
    
        let check = PaymentRecon.fromBuffer(issueResponse);
        console.log("Check details");
        console.log(check);
    
        console.log(
          `${check.issuer} check payment : ${check.checkNumber} successfully issued for value ${check.checkAmount}`
        );
        socket.emit('RESPONSE', {type:'FEED', payload:`${check.issuer} check payment : ${check.checkNumber} successfully issued for value ${check.checkAmount}`})

        console.log("Transaction complete.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})

        console.log(error.stack);
      } finally {
        // Disconnect from the gateway
        console.log("Disconnect from Fabric gateway.");
        gateway.disconnect();
    }
}

async function Reissue (request, socket) {

    const args = {...request.args}

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet(
        "./waynehealth/identity/user/elayabharathi/wallet"
      );
    
      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();
    
      // Main try/catch block
      try {
        // Specify userName for network access
        // const userName = 'elayabharathi.elayaperumal@waynehealth.com';
        const userName = "elayabharathi";
    
        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(
          fs.readFileSync("./waynehealth/gateway/connection-org2.yaml", "utf8")
        );
    
        // Set connection options; identity and wallet
        let connectionOptions = {
          identity: userName,
          wallet: wallet,
          discovery: { enabled: true, asLocalhost: true },
        };
    
        // Connect to gateway using application specified parameters
        console.log("Connect to Fabric gateway.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Connect to Fabric gateway.`})
    
        await gateway.connect(connectionProfile, connectionOptions);
    
        // Access PaperNet network
        console.log("Use network channel: mychannel.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use network channel: mychannel.`})

        const network = await gateway.getNetwork("mychannel");
    
        // Get addressability to commercial paper contract
        console.log("Use org.reconnet.paymentrecon smart contract.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Use org.reconnet.paymentrecon smart contract.`})
    
        const contract = await network.getContract("checkcontract");
    
        // issue check payments
        console.log("Submit payment reconciliation reissue transaction.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Submit payment reconciliation reissue transaction`})
    
        const issueResponse = await contract.submitTransaction(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7]
        );
        // process response
        console.log("Process reissue transaction response." + issueResponse);
        socket.emit('RESPONSE', {type:'FEED', payload:`Process reissue transaction response." + ${issueResponse}`})
    
        let check = PaymentRecon.fromBuffer(issueResponse);
        console.log("Check details");
        console.log(check);
    
        console.log(
          `${check.issuer} check payment : ${check.checkNumber} successfully reissued for value ${check.checkAmount}`
        );
        socket.emit('RESPONSE', {type:'FEED', payload:`${check.issuer} check payment : ${check.checkNumber} successfully reissued for value ${check.checkAmount}`})
        console.log("Transaction complete.");
        socket.emit('RESPONSE', {type:'FEED', payload:`Transaction complete.`})
      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        socket.emit('RESPONSE', {type:'FEED', payload:`Error processing transaction. ${error}`})
        console.log(error.stack);
      } finally {
        // Disconnect from the gateway
        console.log("Disconnect from Fabric gateway.");
        gateway.disconnect();
    }
}

io.on('connection', socket => {

    console.log(`Connected to client with Socket ID ${socket.id}`)
    socket.emit('RESPONSE', {type: 'FEED', payload: `Connected to server with socket ID ${socket.id}`})

    socket.on('REQUEST', (req) => {
        switch (req.action) {
            case "PAY":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for ${req.data.checkNumber} received`});
                Pay(
                    {
                        args: [req.data.ctx, req.data.issuer, req.data.accountNumber, req.data.checkNumber, req.data.checkStatus, req.data.checkPaidDate, req.data.checkAmount, req.data.newOwner]
                    }
                ,socket);
                break;
            case "RE-REQUEST":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for Re-Issue received`});
                Reissuereq(
                    {
                        args: [req.data.ctx, req.data.issuer, req.data.accountNumber, req.data.checkNumber, req.data.checkStatus, req.data.checkAmount]   
                    }                    
                ,socket);
                break;
            case "VALIDATE":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for Validate received`});
                Validate(
                    {
                        args: [req.data.ctx, req.data.issuer, req.data.accountNumber, req.data.checkNumber, req.data.checkStatus, req.data.checkAmount]   
                    }                    
                ,socket);
                break;
            case "ISSUE":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for Issue received`});
                Issue(
                    {
                        args: [req.data.ctx, req.data.issuer, req.data.accountNumber, req.data.checkNumber, req.data.checkStatus, req.data.issueDate, req.data.checkAmount, req.data.paidDate, req.data.reissueCheckNumber, req.data.reissueCheckDate, req.data.payeeId, req.data.payeeName, req.data.newOwner]   
                    }                    
                ,socket);
                break;
            case "REISSUE":
                socket.emit('RESPONSE', {type: 'START', payload: `Request for Issue received`});
                Reissue(
                    {
                        args: [req.data.ctx, req.data.issuer, req.data.accountNumber, req.data.checkNumber, req.data.checkStatus, req.data.reissCheckNumber, req.data.reissCheckDate, req.data.checkAmount]   
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