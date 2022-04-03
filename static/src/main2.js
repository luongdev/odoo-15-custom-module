/** @odoo-module **/

import {action_registry} from 'web.core';

import {
    Home,
    LogIn,
    Register,
    Settings,
    Editor,
    Profile,
} from '@mesocials/components/test'
import {
    App
} from '@mesocials/components/test/app'


const ROUTES = [
    {name: "HOME", path: "/", component: Home},
    {name: "LOG_IN", path: "/login", component: LogIn},
    {name: "REGISTER", path: "/register", component: Register},
    {name: "SETTINGS", path: "/settings", component: Settings},
    {name: "EDITOR", path: "/editor", component: Editor},
    {name: "PROFILE", path: "/profile/@{{username}}", component: Profile},
    {path: "/**", component: Home},
];

const {Component, tags, utils, router, QWeb, mount} = owl;

const RouteComponent = router.RouteComponent;

async function setup() {
    const appHtmlEl = document.getElementById('socials-app');
    const env = await makeEnvironment();
    App['env'] = env;
    await mount(App, {target: appHtmlEl, env});
}


class Root extends Component {

    static template = tags.xml`
        <div id="socials-app">
        
        </div>
  `

    mounted() {
        super.mounted();

        utils.whenReady(setup).then(() => console.log('ok ok'));
    }

    static components = {App};
}


async function makeEnvironment() {
    const env = {qweb: new QWeb()};
    env.router = new router.Router(env, ROUTES, {mode: "hash"});
    await env.router.start();

    return env;
}


action_registry.add('mesocials.socialWidget', Root);


// mount(Root, document.body);