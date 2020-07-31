# Payment-Reconciliation---Hyperedger-Fabric
Reconciling Provider payments with bank

Payment Recon blockchain network created with 2 organizations.

Wayne Health --> Issues payments to the providers who provided services to the members/Patients. It also sends the payments details to the banks.
Bank of Gotham --> Pays the amount sent by Wayne health to the providers.

Transactions are below.
Wayne health adds the payments details to the Blockchain network once the payments are issued. The status of the payments will be now "ISSUED".
Once the provider goes and claims the check amount in the bank, Bank of Gotham updates the status of check to "PAID" after some basic validations. The status of the payment will not be "PAID"
If provider wants the check to be reissued, he/she sends the request to Wayne Health.
Wayne Health then creates a new check and updates the new check details along with the original payment. The status of the original payment will now be "REISSUED"
This way the payments will be reconciled with the banks.

Each organizations above will have their own application to invoke the smart contracts either to update or query from Blockchain.

Network starter shell script will generate certificates using Fabric CAs, Create Org1, Org2 and Orderer identities.
Identities are Peers, org admin, tls certificates, user msp, org admin msp and CA admin, CCP files for org1 and org2.
It will also create a new channel called "mychannel" and join these 2 organization to the channel.


Steps to execute this POC:
1. Run the script "network-starter.sh"
2. Go to Waynehealth folder inside organization folder.
3. Run "source waynehealth.sh" to set the environment variables
4. Run peer lifeycle command to package the chaincode/smart contract files
5. After packaging install the packaged chain code file
6. Run the peer lifecycle approve command
7. Steps from 2 to 6 must be followed for the other organization "bankofgotham"
8. Aftre this the chaincode has to be committed on the channel "mychannel" using the peer lifecycle commit command
9. The chain code/smart contract can be accessed using the application of each organizations.
