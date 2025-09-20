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

    if (!window.isAuthenticated && hash !== '') {
        page = loginPage();
        nav.style.display = 'none';
    } else {
        if (hash === 'dashboard') {
            nav.style.display = 'none'; 
            page = dashboardPage();
        } else {
            nav.style.display = 'block'; 
            switch (hash) {
                case 'patients':
                    page = patientsPage();
                    break;
                case 'appointments':
                    page = appointmentsPage();
                    break;
                case 'finance':
                    page = financePage();
                    break;
                case '':
                    page = loginPage();
                    nav.style.display = 'none';
                    break;
                default:
                    page = loginPage();
                    nav.style.display = 'none';
            }
        }
    }
    page.classList.add('active');
    root.appendChild(page);
}