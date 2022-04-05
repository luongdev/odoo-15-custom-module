/** @odoo-module **/


import viewRegistry from 'web.view_registry';
import {serviceRegistry} from 'web.core';

import {Conversation} from '@mesocials/components/conversation/conversation';

const {Component, hooks} = owl;
const {useState} = hooks;

export class ConversationList extends Component {

    static template = 'mesocials.ConversationList';
    static components = {Conversation};

    constructor(prt, props) {
        super();
        this.props = props;
        this.conversationService = serviceRegistry.get('conversationService');
        this.state = useState({
            conversations: {},
            conversationIds: [],
            hasConversation: false,
            customer: props.customer,
            messageContent: null,
            pickedConversationId: null
        });
        this.onCustomerSelected = this._onCustomerSelected.bind(this);
        this.onPickClicked = this._onPickClicked.bind(this);
        this.sendMessage = this._sendMessage.bind(this);
    }

    async mounted() {
        await this._loadConversations(this.props.senderId);
    }

    async _loadConversations(senderId) {
        if (!senderId) return;

        const response = await this.conversationService.prototype.find_conversations_by_sender(senderId);
        this.state.conversations = response.data.reduce((a, o) => ({...a, [o.conversationId]: o}), {});
        this.state.conversationIds = Object.keys(this.state.conversations);
        this.state.hasConversation = this.state.conversationIds.length > 0;

        this.messageArea = document.getElementById('conversation-area');
        this.messageArea.scrollTop = this.messageArea.scrollHeight;
    }

    async _onCustomerSelected(customer) {
        if (this.state.customer === customer) return;

        const {senderId} = customer;
        this.state.customer = customer;
        this.state.conversations = {};
        this.state.conversationIds = [];
        this.state.hasConversation = false;
        await this._loadConversations(senderId);

        if ('INTERACTIVE' === customer.conversationState) {
            this.state.pickedConversationId = customer.conversationId;
        }
    }

    getConversation(id) {
        return this.state.conversations && this.state.conversations[id];
    }

    get composerDisabled() {
        return !this.state.customer
            || 'OPEN' === this.state.customer.conversationState
            || 'CLOSE' === this.state.customer.conversationState
    }

    get lastTime() {
        return this.state.customer
            && this.state.customer.lastMessage
            && moment(this.state.customer.lastMessage.receivedTime).format('DD/MM/YYYY HH:mm');
    }

    async _onPickClicked(customer) {
        await this._loadConversations(customer.senderId)
        this.state.customer.conversationState = 'INTERACTIVE';
        this.pickedConversationId = customer.conversationId;
    }

    async _sendMessage(ev) {
        if ((!ev || ev.keyCode === 13) && this.state.pickedConversationId) {
            if (this.state.messageContent.length > 0) {
                const lastLnIndex = this.state.messageContent.indexOf('\n');
                if (lastLnIndex === this.state.messageContent.length - 1) {
                    this.state.messageContent = this.state.messageContent.substring(0, lastLnIndex);
                }
            }

            const clonedState = {...this.state};
            this.state.messageContent = '';
            const {pickedConversationId, messageContent, customer} = clonedState;
            this.trigger('last-message-update', {
                message: {
                    text: messageContent,
                    senderId: customer.senderId
                }
            });

            const res = await this.conversationService.prototype.send_message(pickedConversationId, messageContent);
            this.state.conversations[pickedConversationId].messages.push(res.data);

            this.messageArea.scrollTop = this.messageArea.scrollHeight;
        }
    }
}

viewRegistry.add("ConversationList", ConversationList)