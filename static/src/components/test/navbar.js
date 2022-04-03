/** @odoo-module **/
const {Component, tags, router} = owl;
const Link = router.Link;
import {NavbarLink} from "./navbarlink";

const NAVBAR_TEMPLATE = tags.xml/*xml*/`
<nav class="navbar navbar-light">
    <div class="container">
        <NavbarLink to="'LOG_IN'" class="navbar-brand">conduit</NavbarLink>
        <ul class="nav navbar-nav pull-xs-right">
            
        </ul>
    </div>
</nav>
`;

export class Navbar extends Component {
    static template = NAVBAR_TEMPLATE;
    static components = {NavbarLink, Link};
}

// <li class="nav-item">
//                 <Link to="'HOME'" class="nav-link">Home</Link>
//             </li>
//             <li class="nav-item">
//                 <Link to="'EDITOR'" class="nav-link"><i class="ion-compose"></i> New Post</Link>
//             </li>
//             <li class="nav-item">
//                 <Link to="'SETTINGS'" class="nav-link"><i class="ion-gear-a"></i> Settings</Link>
//             </li>
//             </li>
//             <li class="nav-item">
//                 <Link to="'LOG_IN'" class="nav-link">Sign in</Link>
//             </li>
//             <li class="nav-item">
//                 <Link to="'REGISTER'" class="nav-link">Sign up</Link>
//             </li>
//             <li class="nav-item">
//                 <Link to="'PROFILE'" class="nav-link">Coding Dodo</Link>
//             </li>