import { loginPage } from '../components/login.js';
import { dashboardPage } from '../components/dashboard.js';
import { patientsPage } from '../components/patients.js';
import { appointmentsPage } from '../components/appointments.js';
import { financePage } from '../components/finance.js';

export function router() {
    const hash = location.hash.substring(1);
    const root = document.getElementById('root');
    const nav = document.getElementsByTagName('nav')[0];

    root.innerHTML = '';

    let page;

    
    window.isAuthenticated = window.isAuthenticated || false;

    if (!window.isAuthenticated && hash !== '') {
        page = loginPage();
        if (nav) nav.style.display = 'none';
    } else {
        if (nav) nav.style.display = 'block';

        switch (hash) {
            case 'dashboard':
                page = dashboardPage();
                break;
            case 'patients':
                page = patientsPage();
                break;
            case 'appointments':
                page = appointmentsPage();
                break;
            case 'finance':
                page = financePage();
                break;
            default:
                page = loginPage();
                if (nav) nav.style.display = 'none';
        }
    }

    if (page) {
        page.classList.add('active');
        root.appendChild(page);
    }
}