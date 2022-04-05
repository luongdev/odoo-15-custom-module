/** @odoo-module **/

import AbstractService from 'web.AbstractService';
import rpc from 'web.rpc';

export const ConversationService = AbstractService.extend({
    dependencies: [],
    start() {

    },
    async find_customers_with_last_message() {
        return await rpc.query({
            model: 'mesocials.chat',
            method: 'find_customers_with_last_message',
            args: [null, {
                conversationStates: ['OPEN'],
                channels: ['ZL_MESSAGE', 'FB_MESSAGE'],
                applicationIds: ["108717091450300","110572867303162"],
                pageSize: 30,
                currentPage: 1
            }],
        });
    },
    async find_conversations_by_sender(senderId) {
        return await rpc.query({
            model: 'mesocials.chat',
            method: 'find_conversations_by_sender',
            args: [null, {
                senderId,
                pageSize: 200   ,
                currentPage: 1
            }],
        });
    },
    async pick_conversation(conversationId) {
        return await rpc.query({
            model: 'mesocials.chat',
            method: 'pick_conversation',
            args: [null, {
                conversationId
            }],
        });
    },
    async send_message(conversationId, text) {
        return await rpc.query({
            model: 'mesocials.chat',
            method: 'send_message',
            args: [null, {
                text,
                conversationId
            }],
        });
    }
});
