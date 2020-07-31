/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Utility class for collections of ledger states --  a state list
const StateList = require("./../ledger-api/statelist.js");

const PaymentRecon = require("./check.js");

class CheckList extends StateList {
    constructor(ctx) {
        super(ctx, "org.reconnet.paymentreconchecklist");
        this.use(PaymentRecon);
    }

    async addCheck(check) {
        return this.addState(check);
    }

    async getCheck(checkKey) {
        return this.getState(checkKey);
    }

    async updateCheck(check) {
        return this.updateState(check);
    }
}

module.exports = CheckList;
