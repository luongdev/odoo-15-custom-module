/** @odoo-module **/

import {
    Footer,
    Home,
    Navbar,
} from './index'


const {Component, tags, utils, router, QWeb} = owl;

const RouteComponent = router.RouteComponent;

export class App extends Component {

    static template = tags.xml`
    <main>
      <Navbar />
      <RouteComponent />
      <Footer />
    </main>
  `

    static components = {Footer, Home, Navbar, RouteComponent};
}