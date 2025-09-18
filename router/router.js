import {dashboardPage} from '../components/dashboard.js';
import {patientsPage} from '../components/patients.js';
import {appointmentsPage} from '../components/appointments.js';
import {financePage} from '../components/finance.js';

export function router() {
    const hash = location.hash.substring(1);
    // alert(hash); // Optional: remove or comment out for production
    const root = document.getElementById('root');
    root.innerHTML = '';

    let page;

    switch(hash) {
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
            page = dashboardPage();
    }

    page.classList.add('active');
    root.appendChild(page);
}
