/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Fabric smart contract classes
const { Contract, Context } = require("fabric-contract-api");

// PaperNet specifc classes
const PaymentRecon = require("./check.js");
const CheckList = require("./checklist.js");

/**
 * A custom context provides easy access to list of all check payments
 */
class PaymentReconContext extends Context {
    constructor() {
        super();
        // All checks are held in a list of checks
        this.checkList = new CheckList(this);
    }
}

/**
 * Define payment reconciliation smart contract by extending Fabric Contract class
 *
 */
class PaymentReconContract extends Contract {
    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super("org.reconnet.peymentrecon");
        console.log("check contract constructor");
    }

    /**
     * Define a custom context for commercial paper
     */
    createContext() {
        return new PaymentReconContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log("Instantiate the contract");
    }

    /**
     * Issue check
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer Check issuer
     * @param {Integer} accountNumber bank account number
     * @param {Integer} checkNumber check number
     * @param {String} checkStatus status of the check
     * @param {String} issueDate check issue date
     * @param {Integer} checkAmount check amount
     * @param {String} paidDate check paid date
     * @param {Integer} reissueCheckNumber reissue check number
     * @param {String} reissueCheckDate reissue check issue date
     * @param {Integer} payeeId provider ID
     * @param {String} payeeName provider name
     * @param {String} newOwner name of the org who updated last
     */
    async issue(
        ctx,
        issuer,
        accountNumber,
        checkNumber,
        checkStatus,
        issueDate,
        checkAmount,
        paidDate,
        reissueCheckNumber,
        reissueCheckDate,
        payeeId,
        payeeName,
        newOwner
    ) {
        // create an instance of the check
        let check = PaymentRecon.createInstance(
            issuer,
            accountNumber,
            checkNumber,
            checkStatus,
            issueDate,
            checkAmount,
            paidDate,
            reissueCheckNumber,
            reissueCheckDate,
            payeeId,
            payeeName,
            newOwner
        );

        console.log("Check details below");
        console.log(check);
        console.log("End of check details in issue function");
        // Smart contract, rather than check, moves check into ISSUED state
        check.setIssued();
        console.log("after setIssued call");

        // Newly upated organization name
        check.setOwner(newOwner);
        console.log("after setOwner call");

        // Add the check to the list of all similar checks in the ledger world state
        await ctx.checkList.addCheck(check);
        console.log("after addCheck");

        // Must return a serialized paper to caller of smart contract
        return check;
    }

    /**
     * Pay the check
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer Check issuer
     * @param {Integer} accountNumber bank account number
     * @param {Integer} checkNumber check number
     * @param {String} checkStatus status of the check
     * @param {String} checkPaidDate check issue date
     * @param {Integer} checkAmount check amount
     * @param {String} newOwner name of the org who updated last
     */
    async pay(
        ctx,
        issuer,
        accountNumber,
        checkNumber,
        checkStatus,
        checkPaidDate,
        checkAmount,
        newOwner
    ) {
        console.log("inside pay");
        console.log("Check details before update");

        // Retrieve the current paper using key fields provided
        let checkKey = PaymentRecon.makeKey([accountNumber, checkNumber]);
        let check = await ctx.checkList.getCheck(checkKey);

        // Validate check details
        if (check.isIssued() !== true) {
            throw new Error(
                "Check " + checkNumber + " must be in ISSUED status "
            );
        }

        // Moves state from ISSUED to PAID
        if (check.isIssued()) {
            check.setPaid();
        }
        console.log("Status updated as paid");
        //update check paid date
        check.paidDate = checkPaidDate;

        // update the org name who changed the status to Paid
        if (check.isPaid()) {
            check.setOwner(newOwner);
            console.log("owner has been updated");
        } else {
            throw new Error(
                "Check " +
                    checkNumber +
                    " is not Paid. Current state = " +
                    check.getCurrentState()
            );
        }

        // Update the paper
        await ctx.checkList.updateCheck(check);
        return check;
        console.log("Check details after update");
        console.log(check);
    }

    /**
     * Reissue the check
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer Check issuer
     * @param {Integer} accountNumber bank account number
     * @param {Integer} checkNumber check number
     * @param {String} checkStatus status of the check
     * @param {Integer} reissCheckNumber reissue check number
     * @param {String} reissCheckDate reissue check issue date
     * @param {Integer} checkAmount check amount
     */
    async reissue(
        ctx,
        issuer,
        accountNumber,
        checkNumber,
        checkStatus,
        reissCheckNumber,
        reissCheckDate,
        checkAmount
    ) {
        console.log("inside reissue");
        console.log("Check details before update");

        let checkKey = PaymentRecon.makeKey([accountNumber, checkNumber]);

        let check = await ctx.checkList.getCheck(checkKey);

        // Check must be in ISSUED status
        if (check.isIssued() !== true) {
            throw new Error(
                "Check " + checkNumber + " must be in ISSUED status "
            );
        }

        // Verify that the check was not updated by the bank
        if (check.getOwner() === issuer) {
            check.setReissued();
            console.log("Status updated as reissued");
        } else {
            throw new Error(
                "Check was updated by bank" + accountNumber + checkNumber
            );
        }

        //updating reissue details
        check.reissueCheckNumber = reissCheckNumber;
        check.reissueCheckDate = reissCheckDate;

        await ctx.checkList.updateCheck(check);
        return check;
        console.log("Check details after update");
        console.log(check);
    }
}

module.exports = PaymentReconContract;
