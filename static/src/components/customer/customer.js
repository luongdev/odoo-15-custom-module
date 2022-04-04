/** @odoo-module **/

import viewRegistry from 'web.view_registry';

const { Component } = owl;

export class Customer extends Component {

    static template = 'mesocials.Customer';
}

viewRegistry.add('Customer', Customer)