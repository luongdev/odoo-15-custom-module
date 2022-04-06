/** @odoo-module **/

const {core} = owl;
const { EventBus  } = core;

const bus = new EventBus();
const self = this;


export function onCloseConversation(cb) {
    bus.on('closeConversation', self,data => {
        cb(data);
    })
}

export function closeConversation(data = {}) {
    bus.trigger('closeConversation', data);
}
