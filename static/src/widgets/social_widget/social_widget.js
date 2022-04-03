/** @odoo-module **/

import { Chat } from '../../components/chat/chat';

const { Component } = owl;

export class SocialWidget extends Component {

    static template = 'mesocials.SocialWidget';
    static components = { Chat };

}
