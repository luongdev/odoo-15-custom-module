/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import { MessageList } from '@mesocials/components/message_list/message_list'
import { addListeners } from "../../services/socket/socket";

const {Component, hooks} = owl;

export class Conversation extends Component {

    static template = 'mesocials.Conversation';
    static components = { MessageList };


    mounted() {
        super.mounted();
        addListeners(this.onNotification);
    }

    onNotification(notification) {
        console.log('day la listener o trong conversation')
        console.log(notification)
    }

}

viewRegistry.add("Conversation", Conversation)