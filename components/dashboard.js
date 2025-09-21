import { getData } from '../storage/dataManager.js';

export function dashboardPage() {
    const div = document.createElement('div');
    div.className = 'dashboard-wrapper';

    
    const style = document.createElement('style');
    style.textContent = `
        .dashboard-wrapper {
            display: flex;
            min-height: 100vh;
            background: #f5f7fa; /* Light gray background */
        }
        .sidebar {
            width: 250px;
            background: #2E7D32; /* Green from login.js */
            color: #ffffff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            transition: transform 0.3s ease; /* For toggle effect, no animation visible */
        }
        .sidebar.hidden {
            transform: translateX(-100%);
        }
        .sidebar-logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .sidebar-toggle {
            display: none;
            font-size: 24px;
            cursor: pointer;
            position: absolute;
            top: 20px;
            left: 20px;
            color: #2E7D32;
            background: #ffffff;
            border-radius: 50%;
            padding: 5px;
        }
        .sidebar a, .sidebar button {
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            padding: 10px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: none;
            background: none;
            cursor: pointer;
            width: 100%;
            text-align: left;
        }
        .sidebar a:hover, .sidebar button:hover {
            background: #256029; /* Darker green on hover */
        }
        .sidebar a.active {
            background: #388E3C;
            font-weight: bold;
        }
        .sidebar-icon {
            font-size: 20px;
        }
        .dashboard-content {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .dashboard-header {
            text-align: center;
            color: #2E7D32;
            font-size: 28px;
            margin-bottom: 20px;
        }
        .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 1200px;
        }
        .card {
            background: #ffffff;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .card:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* Subtle hover effect */
        }
        .card-icon {
            font-size: 36px;
            color: #2E7D32;
            margin-bottom: 10px;
        }
        .card h3 {
            color: #333;
            font-size: 20px;
            margin-bottom: 8px;
        }
        .card p {
            color: #666;
            font-size: 16px;
        }
        @media (max-width: 768px) {
            .sidebar-toggle {
                display: block;
            }
            .sidebar {
                position: fixed;
                height: 100%;
                z-index: 1000;
            }
            .sidebar.hidden {
                transform: translateX(-100%);
            }
            .dashboard-wrapper {
                flex-direction: column;
            }
            .dashboard-content {
                padding: 10px;
            }
            .dashboard-header {
                font-size: 24px;
            }
            .card {
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(style);

   
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.addEventListener('click', () => {
        const sidebar = div.querySelector('.sidebar');
        sidebar.classList.toggle('hidden');
    });
    div.appendChild(toggleBtn);

    
    const data = getData();
    const revenue = data.finance?.revenue || 0;
    const expenses = data.finance?.expenses || 0;
    const margin = revenue - expenses;
    const numPatients = (data.patients || []).length;
    const numAppointments = (data.appointments || []).length;

    div.innerHTML += `
        <div class="sidebar">
            <div class="sidebar-logo"><i class="fas fa-clinic-medical"></i> ClinicBoard</div>
            <a href="#dashboard" class="active"><i class="fas fa-home sidebar-icon"></i> Dashboard</a>
            <a href="#patients"><i class="fas fa-users sidebar-icon"></i> Patients</a>
            <a href="#appointments"><i class="fas fa-calendar-check sidebar-icon"></i> RDV</a>
            <a href="#finance"><i class="fas fa-dollar-sign sidebar-icon"></i> Finance</a>
            <button onclick="window.isAuthenticated = false; location.hash = ''"><i class="fas fa-sign-out-alt sidebar-icon"></i> Logout</button>
        </div>
        <div class="dashboard-content">
            <h1 class="dashboard-header"><i class="fas fa-clinic-medical"></i> ClinicBoard Dashboard</h1>
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-coins"></i></div>
                    <h3>Chiffre d’affaires mensuel</h3>
                    <p>${revenue.toLocaleString('fr-FR')} MAD</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-wallet"></i></div>
                    <h3>Total dépenses</h3>
                    <p>${expenses.toLocaleString('fr-FR')} MAD</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    <h3>Marge</h3>
                    <p>${margin.toLocaleString('fr-FR')} MAD</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <h3>Nombre de patients</h3>
                    <p>${numPatients}</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
                    <h3>Nombre de consultations</h3>
                    <p>${numAppointments}</p>
                </div>
            </div>
        </div>
    `;

   
    const sidebar = div.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('hidden');
    }

    return div;
}