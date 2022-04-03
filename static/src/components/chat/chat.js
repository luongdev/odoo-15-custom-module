/** @odoo-module **/

import { CustomerList } from '@mesocials/components/customer_list/customer_list'


const { Component } = owl;

export class Chat extends Component {

  static components = { CustomerList }; 
}


Chat.template = 'mesocials.Chat';