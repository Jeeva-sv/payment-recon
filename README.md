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
