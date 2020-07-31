/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Utility class for ledger state
const State = require("./../ledger-api/state.js");

// Enumerate check status values
const cpState = {
    ISSUED: 1,
    PAID: 2,
    REISSUED: 3,
};

/**
 * PaymentRecon class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class PaymentRecon extends State {
    constructor(obj) {
        super(PaymentRecon.getClass(), [obj.accountNumber, obj.checkNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
     */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getStatus() {
        return this.status;
    }

    setStatus(checkStatus) {
        this.status = checkStatus;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate payment reconciliation states
     */
    setIssued() {
        this.currentState = cpState.ISSUED;
    }

    setPaid() {
        this.currentState = cpState.PAID;
    }

    setReissued() {
        this.currentState = cpState.REISSUED;
    }

    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    isPaid() {
        return this.currentState === cpState.PAID;
    }

    isReissued() {
        return this.currentState === cpState.REISSUED;
    }

    static fromBuffer(buffer) {
        return PaymentRecon.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, PaymentRecon);
    }
    /**
     * Factory method to create a check object
     */
    static createInstance(
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
        console.log("Start - create instance method");
        return new PaymentRecon({
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
            newOwner,
        });

        console.log("check.js-inside create instance");
    }

    static getClass() {
        return "org.reconnet.paymentrecon";
    }
}

module.exports = PaymentRecon;
