/** @odoo-module **/

import viewRegistry from 'web.view_registry';

import {CustomerList} from '@mesocials/components/customer_list/customer_list';

const {Component, hooks} = owl;
const { useRef } = hooks;

export class Sidebar extends Component {

    customerList = useRef("child")

    static template = 'mesocials.Sidebar';

    constructor() {
        super();
        this.lastMessageUpdate = this._lastMessageUpdate.bind(this);
    }

    static components = {CustomerList};

    _lastMessageUpdate(message) {
        const { comp: customerListComponent } = this.customerList;
        if (!customerListComponent) return;

        customerListComponent.lastMessageUpdate(message)
    }
}

viewRegistry.add('Sidebar', Sidebar)