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
 * 4. Construct request to pay the check
 * 5. Submit transaction
 * 6. Process response
 */

"use strict";

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require("fs");
const yaml = require("js-yaml");
const { Wallets, Gateway } = require("fabric-network");
const PaymentRecon = require("../../waynehealth/contract/lib/check.js");

// Main program function
async function main() {
  // A wallet stores a collection of identities for use
  const wallet = await Wallets.newFileSystemWallet(
    "../identity/user/jeeva/wallet"
  );

  // A gateway defines the peers used to access Fabric networks
  const gateway = new Gateway();

  // Main try/catch block
  try {
    // Specify userName for network access
    const userName = "jeeva";

    // Load connection profile; will be used to locate a gateway
    let connectionProfile = yaml.safeLoad(
      fs.readFileSync("../gateway/connection-org1.yaml", "utf8")
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

    // Access Reconnet network
    console.log("Use network channel: mychannel.");

    const network = await gateway.getNetwork("mychannel");

    // Get addressability to payment reconciliation contract
    console.log("Use org.reconnet.paymentrecon smart contract.");

    const contract = await network.getContract("checkcontract");

    // const contract = await network.getContract(
    //   "checkcontract",
    //   "org.reconnet.paymentrecon"
    // );

    // submit paid transaction
    console.log("Submit Paid transaction of the check.");

    const payResponse = await contract.submitTransaction(
      "pay",
      "Wayne Health",
      "321458697879",
      "10000000007",
      "PAID",
      "2020-07-04",
      "15000",
      "Bank of Gotham"
    );
    // process response
    console.log("Process pay transaction response.");

    let check = PaymentRecon.fromBuffer(payResponse);
    console.log("Check details");
    console.log(check);

    console.log(
      `${check.issuer} check : ${check.checkNumber} successfully paid by ${check.owner}`
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
    console.log("Pay program complete.");
  })
  .catch((e) => {
    console.log("Pay program exception.");
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
  });
