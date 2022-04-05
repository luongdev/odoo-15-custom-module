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
        this.customerNewConversation = this._customerNewConversation.bind(this);
    }

    async mounted() {
        const response = await this.conversationService.prototype.find_customers_with_last_message();
        this.state.customers = response.data.reduce((a, o) => ({...a, [o.senderId]: o}), {});
        this.state.senderIds = Object.keys(this.state.customers);

        addListeners(this.customerNewConversation);

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
        if ('agent_received_message' !== event) return;
        this.lastMessageUpdate({ senderId, text })
    }

    _customerNewConversation({ event, data: { message } }) {
       if ('agent_receive_notification' !== event) return;

       const senderId = message.senderId;
       let customer = this.state.customers[senderId];
       if (!customer) {
           customer = {
                senderId,
                conversationState: 'OPEN',
                lastMessage: message,
                ...message.conversation
           };
           this.state.customers[senderId] = { ...customer };
           this.state.senderIds.push(senderId);
       } else {
           this.state.senderIds = this.state.senderIds.filter(s => senderId !== s);
           this.state.senderIds.push(senderId);
       }

       this.lastMessageUpdate({ senderId, text: message.text })
    }
}

viewRegistry.add('CustomerList', CustomerList)