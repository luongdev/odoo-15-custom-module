/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import {Message} from '@mesocials/components/message/message'
import {addListeners} from "../../services/socket/socket";

const {Component, hooks} = owl;
const {useState} = hooks;

export class Conversation extends Component {

    static template = 'mesocials.Conversation';
    static components = {Message};

    constructor(prt, props) {
        super(prt, props);
        addListeners(this.onNotification);
        const {conversation} = props;
        const {messages} = conversation;
        this.state = useState({conversation, messages});
    }

    onNotification(notification) {
        console.log('day la listener o trong conversation')
        console.log(notification)
    }

    _addMessage(message) {
        const messages = this.state.messages;
        message.push(message);
        this.state.messages = messages;
    }

}

viewRegistry.add("Conversation", Conversation)