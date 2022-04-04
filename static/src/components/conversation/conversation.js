/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import { MessageList } from '@mesocials/components/message_list/message_list'

const {Component, hooks} = owl;

export class Conversation extends Component {

    static template = 'mesocials.Conversation';
    static components = { MessageList };
}

viewRegistry.add("Conversation", Conversation)