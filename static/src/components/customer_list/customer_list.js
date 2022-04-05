/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import {Customer} from "@mesocials/components/customer/customer";
import { addListeners } from '@mesocials/services/socket/socket';
import {serviceRegistry} from 'web.core';

const {Component, hooks} = owl;
const {useState} = hooks;

export class CustomerList extends Component {

    static template = 'mesocials.CustomerList';
    static components = {Customer};

    constructor(_, props) {
        super(_, props);
        this.conversationService = serviceRegistry.get('conversationService');
        this.socketService = serviceRegistry.get('socketService');
        this.state = useState({customers: {}, senderIds: []});
        this.lastMessageUpdate = this._lastMessageUpdate.bind(this);
        this.onNewMessage = this._onNewMessage.bind(this);
    }

    async mounted() {
        const response = await this.conversationService.prototype.find_customers_with_last_message();
        this.state.customers = response.data.reduce((a, o) => ({...a, [o.senderId]: o}), {});
        this.state.senderIds = Object.keys(this.state.customers);

        const interactiveConversationIds = Object.values(this.state.customers)
            .filter(c => 'INTERACTIVE' === c.conversationState)
            .map(c => c.conversationId);

        if (interactiveConversationIds && interactiveConversationIds.length > 0) {
            this.socketService.prototype.join_rooms(interactiveConversationIds);
            addListeners(this.onNewMessage)
        }
    }

    getCustomer(senderId) {
        return this.state.customers[senderId];
    }

    _lastMessageUpdate({ text, senderId }) {
        this.state.customers[senderId].lastMessage.text = text;
    }

    _onNewMessage({ event, data: { senderId, text } }) {
        if ('agent_received_message' !== event || !senderId || !text) return;

        this.lastMessageUpdate({ senderId, text })
    }
}

viewRegistry.add('CustomerList', CustomerList)