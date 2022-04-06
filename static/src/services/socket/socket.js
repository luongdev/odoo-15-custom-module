/** @odoo-module **/

import AbstractService from 'web.AbstractService';

const listeners = [];

export const addListeners = (listener) => {
    if (!listener || typeof(listener) !== 'function') {
        throw new Error('Listener must be a function');
    }
    listeners.push(listener);
}

let socket = null;

export const SocketService = AbstractService.extend({
    dependencies: [],
    start() {
        this.listeners = [];
        socket = io('https://uat-crm.gmarket24h.com', {
            path: '/chat-server',
            transports: ['websocket'],
            autoConnect: false,
            query: {
                tenantId: 4,
                cloudTenantId: 4,
                participantId: 69,
                participantType: 'AGENT',
                fullName: 'A Đê Min'
            },
            auth: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IlRZUldIWkNDVVRHT0c2UVlZU0dXR1NEUlhOU1AzRTJVIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiMSIsImp0aSI6ImQ5ZGQ3ZmJkLTgwYTAtNDFlYi05YTc4LTUxNWQ0ZGQyNjgzZCIsImlhdCI6MTY0OTE0MjA1OSwibmJmIjoxNjQ5MTQyMDU5LCJleHAiOjE2NDkyMjg0NTksImlzcyI6IkFkbWluIiwiYXVkIjoiQWRtaW4ifQ.A8WtNyJ1vFDKsdYx-fUWUxvNDft4IO5gNjneKQ6r2Ag'
            }
        });

        socket.on('connect', () => {
            const initData = {
                cloudTenantId: 4,
                cloudAgentId: 69,
                agentName: 'A Đê Min',
                applicationIds: ["108717091450300", "1818300178909749291", "2428970580446024137"],
                maxNumOfConversations: 1000
            };
            socket.emit('agent_initialize', initData, initCb => {
                socket.on('agent_receive_notification', notification => {
                    for(const listener of listeners) {
                        listener({ event: 'agent_receive_notification', data: notification });
                    }
                });
                socket.on('agent_received_message', notification => {
                    for(const listener of listeners) {
                        listener({ event: 'agent_received_message', data: notification });
                    }
                });
            });
        })

        socket.on('disconnect', reason => {
            console.log(reason)
        })
        socket.connect();
    },
    join_rooms(rooms) {
        this._interval = setInterval(() => {
            console.log(this._socket);

            if (socket && socket.connected) {
                socket.emit('agent_join_rooms', { rooms }, joinCb => {
                })
                clearInterval(this._interval)
            }
        }, 1000);

    },
    getSocket() {
        return socket;
    }
});
