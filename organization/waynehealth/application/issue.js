/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

"use strict";

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require("fs");
const yaml = require("js-yaml");
const { Wallets, Gateway } = require("fabric-network");
const PaymentRecon = require("../contract/lib/check.js");

// Main program function
async function main() {
  // A wallet stores a collection of identities for use
  const wallet = await Wallets.newFileSystemWallet(
    "../identity/user/elayabharathi/wallet"
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
      fs.readFileSync("../gateway/connection-org2.yaml", "utf8")
    );

    // Set connection options; identity and wallet
    let connectionOptions = {
      identity: userName,
      wallet: wallet,
      discovery: { enabled: true, asLocalhost: true },
    };

    // Connect to gateway using application specified parameters
    console.log("Connect to Fabric gateway.");

    await gateway.connect(connectionProfile, connectionOptions);

    // Access PaperNet network
    console.log("Use network channel: mychannel.");

    const network = await gateway.getNetwork("mychannel");

    // Get addressability to commercial paper contract
    console.log("Use org.reconnet.paymentrecon smart contract.");

    const contract = await network.getContract("checkcontract");

    // issue check payments
    console.log("Submit payment reconciliation issue transaction.");

    const issueResponse = await contract.submitTransaction(
      "issue",
      "Wayne Health",
      "321458697879",
      "10000000003",
      "Outstanding",
      "2020-09-16",
      "15000",
      " ",
      "9999999999",
      " ",
      "00000003",
      "Ruby",
      "Wayne Health"
    );
    // process response
    console.log("Process issue transaction response." + issueResponse);

    let check = PaymentRecon.fromBuffer(issueResponse);
    console.log("Check details");
    console.log(check);

    console.log(
      `${check.issuer} check payment : ${check.checkNumber} successfully issued for value ${check.checkAmount}`
    );
    console.log("Transaction complete.");
  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
  } finally {
    // Disconnect from the gateway
    console.log("Disconnect from Fabric gateway.");
    gateway.disconnect();
  }
}
main()
  .then(() => {
    console.log("Issue program complete.");
  })
  .catch((e) => {
    console.log("Issue program exception.");
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
  });
