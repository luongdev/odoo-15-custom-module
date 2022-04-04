/** @odoo-module **/

import { Sidebar } from '../../components/sidebar/sidebar';
import { Conversation } from '../../components/conversation/conversation';

const { Component } = owl;

export class SocialWidget extends Component {

    static template = 'mesocials.SocialWidget';
    static components = { Conversation, Sidebar };

}
