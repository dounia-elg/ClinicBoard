import {router} from './router/router.js';
import './auth/auth.js';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);