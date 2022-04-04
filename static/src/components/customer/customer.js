/** @odoo-module **/

import viewRegistry from 'web.view_registry';

const { Component } = owl;

export class Customer extends Component {
    static template = 'mesocials.Customer';

    setup() {
        this.customerClicked = this._customerClicked.bind(this);
        this.pickConversationClicked = this._pickConversationClicked.bind(this);
    }

    get receivedDateTime() {
        const receivedTime = moment(this.props.customer.lastMessage['receivedTime']);
        return receivedTime.format('DD/MM/YYYY HH:mm');
    }

    get lastMessageText() {
        return this.props.customer.lastMessage.text;
    }

    get conversationState() {
        return this.props.customer.conversationState;
    }

    _customerClicked() {
        alert('_customerClicked')
    }

    _pickConversationClicked() {
        alert('_pickConversationClicked')
    }
}

viewRegistry.add('Customer', Customer)