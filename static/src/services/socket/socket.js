/** @odoo-module **/

import AbstractService from 'web.AbstractService';

const listeners = [];

export const addListeners = (listener) => {
    if (!listener || typeof(listener) !== 'function') {
        throw new Error('Listener must be a function');
    }
    listeners.push(listener);
}

export const SocketService = AbstractService.extend({
    dependencies: [],
    start() {
        this.listeners = [];
        this._socket = io('http://localhost:3000', {
            path: '/chat-server',
            transports: ['websocket'],
            autoConnect: false,
            query: {
                tenantId: 135,
                participantId: 1,
                participantType: 'AGENT',
                fullName: 'A Đê Min'
            },
            auth: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkJBWVZBUU5LNE4zQUdXWlNDUUZaMkpEVjMzS0hQQ0pHIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxMzUiLCJzdWIiOiIxIiwianRpIjoiMDU2ZDljZTQtYWQ2NS00NGRkLThiMjEtZTFkY2RiM2FkY2U3IiwiaWF0IjoxNjQ5MDU0MzM1LCJuYmYiOjE2NDkwNTQzMzUsImV4cCI6MTY0OTE0MDczNSwiaXNzIjoiQWRtaW4iLCJhdWQiOiJBZG1pbiJ9.9tjjO1iUxlBxb2oK9OrIGuGMC4tmIFhAUfsRkhVvKhA'
            }
        });

        this._socket.on('connect', () => {
            const initData = {
                cloudTenantId: 135,
                cloudAgentId: 1,
                agentName: 'A Đê Min',
                applicationIds: ["108717091450300", "110572867303162"],
                maxNumOfConversations: 1000
            };
            this._socket.emit('agent_initialize', initData, initCb => {
                console.log(initCb)
                this._socket.on('agent_receive_notification', notification => {
                    debugger
                    for(const listener of listeners) {
                        listener(notification);
                    }
                });
            });
        })

        this._socket.on('disconnect', reason => {
            console.log(reason)
        })

        this._socket.connect();
    },
    get socket() {
        return this._socket;
    }
});
