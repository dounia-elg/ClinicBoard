import {router} from './router/router.js';
import './auth/auth.js';
import { getAuthData, getData } from './storage/dataManager.js';


window.addEventListener('load', () => {
    getData(); // Initializiw data if needed
    const authData = getAuthData();
    if (authData.passwordHash) {
        window.isAuthenticated = true;
    }
    router();
});

window.addEventListener('hashchange', router);