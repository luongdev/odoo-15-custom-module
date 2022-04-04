/** @odoo-module **/

import viewRegistry from 'web.view_registry';

import {CustomerList} from '@mesocials/components/customer_list/customer_list';

const {Component, hooks} = owl;

export class Sidebar extends Component {

    static template = 'mesocials.Sidebar';

    setup() {

    }

    static components = {CustomerList};
}

viewRegistry.add('Sidebar', Sidebar)