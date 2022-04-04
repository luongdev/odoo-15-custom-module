/** @odoo-module **/

import { action_registry, serviceRegistry } from 'web.core';
import { SocialWidget } from '@mesocials/widgets/social_widget/social_widget'
import { SocketService, addListeners } from '@mesocials/services/socket/socket'
import { ConversationService } from '@mesocials/services/conversation/conversation';

action_registry.add('mesocials.socialWidget', SocialWidget);

const listener = (notification) => {
    console.log(notification);
}

addListeners(listener);
serviceRegistry.add("socketService", SocketService);
serviceRegistry.add("conversationService", ConversationService);


