/** @odoo-module **/

import viewRegistry from 'web.view_registry';

const {Component, hooks} = owl;
const {useState} = hooks;

export class Message extends Component {

    static template = 'mesocials.Message';

    constructor(_, props) {
        super(_, props);
    }

    get fromAgent() {
        return 'CUSTOMER' !== this.props.message.fromParticipant;
    }

    get senderName() {
        return this.props.message.senderName || 'Anonymous';
    }

    get messageTime() {
        return moment(this.props.message.receivedTime).format('DD/MM/YYYY HH:mm');
    }

    get text() {
        return this.props.message.text;
    }

}

viewRegistry.add('Message', Message)