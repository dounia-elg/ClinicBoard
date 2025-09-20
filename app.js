import {router} from './router/router.js';
import './auth/auth.js';


window.addEventListener('load', () => {
    
    if (localStorage.getItem('passwordHash')) {
        window.isAuthenticated = true;
    }
    router();
});

window.addEventListener('hashchange', router);