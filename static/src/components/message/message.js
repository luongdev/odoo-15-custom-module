/** @odoo-module **/

import viewRegistry from 'web.view_registry';

const {Component, hooks} = owl;
const {useState} = hooks;

export class Message extends Component {

    static template = 'mesocials.Message';

    setup() {

    }
}

viewRegistry.add('Message', Message)