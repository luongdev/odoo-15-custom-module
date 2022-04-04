/** @odoo-module **/

import viewRegistry from 'web.view_registry';
import {Customer} from "@mesocials/components/customer/customer";

const { Component } = owl;

export class CustomerList extends Component {


    static template = 'mesocials.CustomerList';
    static components = { Customer };
}

viewRegistry.add('CustomerList', CustomerList)