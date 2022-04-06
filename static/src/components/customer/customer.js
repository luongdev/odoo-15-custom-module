/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import {serviceRegistry} from 'web.core';
import { closeConversation } from '@mesocials/services/conversation/conversation_bus';


const {Component, hooks} = owl;
const { useState } = hooks;

export class Customer extends Component {
    static template = 'mesocials.Customer';

    constructor(_, props) {
        super(_, props);
        this.conversationService = serviceRegistry.get('conversationService');
        this.state = useState({
            conversationState: this.props.customer.conversationState,
            lastMessageText: this.props.customer.lastMessage.text
        });

    }

    setup() {
        this.lastMessageUpdate = this._lastMessageUpdate.bind(this);
        this.closeConversationClicked = this._closeConversationClicked.bind(this);
        this.customerClicked = this._customerClicked.bind(this);
        this.pickConversationClicked = this._pickConversationClicked.bind(this);
    }

    get receivedDateTime() {
        const receivedTime = moment(this.props.customer.lastMessage['receivedTime']);
        return receivedTime.format('DD/MM/YYYY HH:mm');
    }

    get lastMessageText() {
        return this.state.lastMessageText;
    }

    get conversationState() {
        return this.state.conversationState;
    }

    shouldUpdate(nextProps) {
        this.state.lastMessageText = nextProps.customer.lastMessage.text;
    }

    _customerClicked() {
        this.trigger('customer-click', {
            customer: this.props.customer
        });
    }

    async _pickConversationClicked() {
        const { conversationId } = this.props.customer;
        this.trigger('pick-click', {
            customer: this.props.customer
        });

        await this.conversationService.prototype.pick_conversation(conversationId);
        this.state.conversationState = 'INTERACTIVE';
    }

    _lastMessageUpdate(message) {
        this.state.lastMessageText = message.text;
    }

    async _closeConversationClicked() {
        debugger
        const { conversationId } = this.props.customer;
        await this.conversationService.prototype.close_conversation(conversationId);
        this.state.conversationState = 'CLOSE';

        closeConversation({ conversationId, customer: this.props })
    }
}

viewRegistry.add('Customer', Customer)