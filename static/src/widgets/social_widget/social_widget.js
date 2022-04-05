/** @odoo-module **/

import {Sidebar} from '../../components/sidebar/sidebar';
import {ConversationList} from '../../components/conversation_list/conversation_list';

const {Component, hooks} = owl;
const {useState, useRef} = hooks;

export class SocialWidget extends Component {

    static template = 'mesocials.SocialWidget';
    static components = {ConversationList, Sidebar};

    conversationList = useRef('child')
    sideBar = useRef('child2')

    constructor() {
        super();
        this.state = useState({
            senderId: null,
            customer: {}
        });
        this.onCustomerClicked = this._onCustomerClicked.bind(this);
        this.onPickClicked = this._onPickClicked.bind(this);
        this.onLastMessageUpdate = this._onLastMessageUpdate.bind(this);
    }

    setup() {
        super.setup();



    }

    async _onCustomerClicked({detail: {customer}}) {
        this.state.senderId = customer.senderId;
        this.state.customer = customer;
        const {comp: conversationList} = this.conversationList;
        if (!conversationList) return;

        await conversationList.onCustomerSelected(customer);
    }

    async _onPickClicked({detail: {customer}}) {
        const {comp: conversationList} = this.conversationList;
        if (!conversationList) return;
        await conversationList.onPickClicked(customer);
    }

    async _onLastMessageUpdate({detail: {message}}) {
        let {comp: sideBarComponent} = this.sideBar;
        if (!sideBarComponent) return;

        sideBarComponent.lastMessageUpdate(message);
    }

    get senderId() {
        return this.state.senderId;
    }

}
