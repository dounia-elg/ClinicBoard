import {dashboardpage} from '../components/dashboard.js';
import {patientspage} from '../components/patients.js';
import {appointmentspage} from '../components/appointments.js';
import {financepage} from '../components/finance.js';


export function router() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    const hash = window.location.hash;

    let page;
    switch(hach) {
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
            page = homePage();

    }

    page.classlist.add('active');
    root.appendChild(page);

}
