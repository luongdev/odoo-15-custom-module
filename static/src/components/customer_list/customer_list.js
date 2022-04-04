/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import {Customer} from "@mesocials/components/customer/customer";
import { serviceRegistry } from 'web.core';

const { Component, hooks } = owl;
const { useState } = hooks;

export class CustomerList extends Component {

    static template = 'mesocials.CustomerList';
    static components = { Customer };

    constructor() {
        super();
        this.conversationService = serviceRegistry.get('conversationService');
    }

    async willStart() {
        this.state = useState({ customers: {}, senderIds: [] });
    }

    async mounted() {
        const response = await this.conversationService.prototype.find_customers_with_last_message();
        this.state.customers = response.data.reduce((a, o) => ({ ...a, [o.senderId]: o}), {});
        this.state.senderIds = Object.keys(this.state.customers);
    }

    getCustomer(senderId) {
        return this.state.customers[senderId];
    }
}

viewRegistry.add('CustomerList', CustomerList)