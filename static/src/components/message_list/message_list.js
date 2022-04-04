/** @odoo-module **/

import viewRegistry from 'web.view_registry';

import { Message } from '@mesocials/components/message/message';

const {Component, hooks} = owl;
const {useState} = hooks;

export class MessageList extends Component {

    setup() {
        super.setup();
        this.state = useState({
            messages: [
                { id: 1, content: 'Con me may odoo', author: '1'},
                { id: 2, content: 'Con me may odoo', author: '2'},
                { id: 3, content: 'Con me may odoo', author: '1'},
                { id: 4, content: 'Con me may odoo', author: '2'},
                { id: 5, content: 'Con me may odoo', author: '1'},
                { id: 6, content: 'Con me may odoo', author: '1'},
                { id: 7, content: 'Con me may odoo', author: '2'},
                { id: 8, content: 'Con me may odoo', author: '2'},
                { id: 9, content: 'Con me may odoo', author: '2'},
                { id: 10, content: 'Con me may odoo', author: '1'},
                { id: 11, content: 'Con me may odoo', author: '2'},
                { id: 12, content: 'Con me may odoo', author: '2'},
                { id: 13, content: 'Con me may odoo', author: '1'},
                { id: 14, content: 'Con me may odoo', author: '1'},
                { id: 15, content: 'Con me may odoo', author: '1'},
                { id: 16, content: 'Con me may odoo', author: '2'},
                { id: 17, content: 'Con me may odoo', author: '2'},
                { id: 18, content: 'Con me may odoo', author: '2'},
                { id: 19, content: 'Con me may odoo', author: '1'},
                { id: 20, content: 'Con me may odoo', author: '1'},
                { id: 21, content: 'Con me may odoo', author: '2'},
                { id: 22, content: 'Con me may odoo', author: '2'},
                { id: 23, content: 'Con me may odoo', author: '1'},
                { id: 24, content: 'Con me may odoo', author: '2'},
                { id: 25, content: 'Con me may odoo', author: '2'},
            ],
            maxId: 25
        });
        this.onMessageClick = this._onMessageClick.bind(this);
    }

    _onMessageClick() {
        const { messages } = this.state;
        this.state.maxId = this.state.maxId + 1;
        messages.push({ id: this.state.maxId, content: 'con me may odoo', author: '1' })
    }


    static template = 'mesocials.MessageList';
    static components = { Message };
}

viewRegistry.add('MessageList', MessageList)