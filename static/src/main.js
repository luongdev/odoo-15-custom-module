/** @odoo-module **/

import { action_registry, serviceRegistry } from 'web.core';

import AbstractService from 'web.AbstractService';
import { registry } from '@web/core/registry';

import { SocialWidget } from '@mesocials/widgets/social_widget/social_widget'
import { Footer, Home, Navbar } from '@mesocials/components/test'


const { Component, tags } = owl;


class Root extends Component {
  static template = tags.xml`
    <div>Ấn em đi anh!</div>
  `

  static components = { Footer, Home, Navbar };
}

const systrayRegistry = registry.category('systray');

action_registry.add('mesocials.socialWidget', SocialWidget);
systrayRegistry.add('mesocial.root', {
  Component: Root,
}, { sequence: 10000 })

console.log(systrayRegistry)

// mount(Root, document.body);

/** @odoo-module **/



