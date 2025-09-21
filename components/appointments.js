import { getData, saveData } from '../storage/dataManager.js';

export function appointmentsPage() {
    const div = document.createElement('div');
    div.className = 'appointments-page';
    
    const style = document.createElement('style');
    style.textContent = `
        .appointments-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
            min-height: 100vh;
        }
        
        .search-section {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .filter-section {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .filter-group {
            display: flex;
            flex-direction: column;
            min-width: 200px;
        }
        
        .filter-label {
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
            font-size: 14px;
        }
        
        .filter-select {
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 14px;
            background: white;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .filter-select:focus {
            outline: none;
            border-color: #3ba851;
            box-shadow: 0 0 0 3px rgba(59, 168, 81, 0.1);
        }
        
        .clear-filters-btn {
            padding: 12px 20px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            align-self: end;
        }
        
        .clear-filters-btn:hover {
            background: #5a6268;
        }
        
        .search-input {
            flex: 1;
            padding: 15px 20px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .search-input:focus {
            outline: none;
            box-shadow: 0 2px 15px rgba(59, 168, 81, 0.3);
        }
        
        .search-btn {
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 25px;
            background: #3ba851;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        
        .search-btn:hover {
            background: #2d8a3e;
        }
        
        .appointments-table-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin-bottom: 40px;
            overflow-x: auto;
        }
        
        .appointments-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 16px;
        }
        
        .appointments-table th {
            background: #3ba851;
            color: white;
            padding: 15px 12px;
            text-align: left;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        
        .appointments-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e0e0e0;
            vertical-align: top;
        }
        
        .appointments-table tr:hover {
            background: #f8f9fa;
        }
        
        .appointments-table tr:last-child td {
            border-bottom: none;
        }
        
        .patient-name {
            font-weight: bold;
            color: #3ba851;
        }
        
        .practitioner-name {
            color: #666;
        }
        
        .appointment-datetime {
            color: #333;
            font-weight: 500;
        }
        
        .room-info {
            color: #666;
        }
        
        .consultation-type {
            color: #333;
        }
        
        .duration-info {
            color: #666;
        }
        
        .status-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .status-scheduled {
            background: #e3f2fd;
            color: #1976d2;
        }
        
        .status-completed {
            background: #e8f5e8;
            color: #2e7d32;
        }
        
        .status-cancelled {
            background: #ffebee;
            color: #c62828;
        }
        
        .status-no-show {
            background: #fff3e0;
            color: #f57c00;
        }
        
        .edit-btn {
            background: none;
            border: none;
            color: #ffc107;
            cursor: pointer;
            font-size: 18px;
            padding: 5px;
            margin-right: 10px;
        }
        
        .edit-btn:hover {
            color: #e0a800;
        }
        
        
        .add-appointment-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .section-title {
            color: #333;
            margin-bottom: 25px;
            font-size: 24px;
            font-weight: 600;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-label {
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
            font-size: 14px;
        }
        
        .form-input {
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #3ba851;
            box-shadow: 0 0 0 3px rgba(59, 168, 81, 0.1);
        }
        
        .form-select {
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 16px;
            background: white;
            transition: all 0.3s ease;
        }
        
        .form-select:focus {
            outline: none;
            border-color: #3ba851;
            box-shadow: 0 0 0 3px rgba(59, 168, 81, 0.1);
        }
        
        .save-btn {
            width: 100%;
            padding: 18px;
            background: #3ba851;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .save-btn:hover {
            background: #2d8a3e;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(59, 168, 81, 0.3);
        }
        
        .empty-message {
            text-align: center;
            color: #666;
            font-style: italic;
            padding: 40px;
            font-size: 16px;
        }
    `;
    
    div.appendChild(style);
    
    div.innerHTML += `
        
        <div class="filter-section">
            <div class="filter-group">
                <label class="filter-label">Filtrer par Praticien</label>
                <select id="practitionerFilter" class="filter-select">
                    <option value="">Tous les praticiens</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label class="filter-label">Filtrer par Statut</label>
                <select id="statusFilter" class="filter-select">
                    <option value="">Tous les statuts</option>
                    <option value="Scheduled">Programmé</option>
                    <option value="Completed">Terminé</option>
                    <option value="Cancelled">Annulé</option>
                    <option value="No-show">Absent</option>
                </select>
            </div>
            
            <button id="clearFiltersBtn" class="clear-filters-btn">
                Effacer les filtres
            </button>
        </div>
        
        <div class="appointments-table-container">
            <table class="appointments-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Praticien</th>
                        <th>Date/Heure</th>
                        <th>Salle</th>
                        <th>Type</th>
                        <th>Durée</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="appointmentsList"></tbody>
            </table>
        </div>
        
        <div class="add-appointment-section">
            <h3 class="section-title" id="formTitle">Ajouter un Rendez-vous</h3>
            <form id="appointmentForm">
                <input type="hidden" id="editIndex" value="">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Patient *</label>
                        <select id="patientSelect" class="form-select" required>
                            <option value="">Sélectionner un patient</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Praticien *</label>
                        <input type="text" id="practitionerName" placeholder="Nom du praticien" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Date *</label>
                        <input type="date" id="appointmentDate" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Heure *</label>
                        <input type="time" id="appointmentTime" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Salle *</label>
                        <input type="text" id="roomNumber" placeholder="Ex: Salle 1, Cabinet A" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Type de consultation *</label>
                        <select id="consultationType" class="form-select" required>
                            <option value="">Sélectionner le type</option>
                            <option value="Consultation générale">Consultation générale</option>
                            <option value="Suivi médical">Suivi médical</option>
                            <option value="Urgence">Urgence</option>
                            <option value="Contrôle">Contrôle</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Durée (minutes) *</label>
                        <select id="duration" class="form-select" required>
                            <option value="">Sélectionner la durée</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">120 minutes</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Statut</label>
                        <select id="status" class="form-select">
                            <option value="Scheduled">Programmé</option>
                            <option value="Completed">Terminé</option>
                            <option value="Cancelled">Annulé</option>
                            <option value="No-show">Absent</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="save-btn">
                    <span id="saveBtnText">Enregistrer</span>
                </button>
            </form>
        </div>
    `;
    
    setTimeout(() => {
        loadAppointments();
        loadPatients();
        loadPractitioners();
        setupEvents();
    }, 0);
    
    return div;
}

function loadAppointments() {
    const data = getData();
    const appointments = data.appointments || [];
    const appointmentsList = document.getElementById('appointmentsList');
    
    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<tr><td colspan="8" class="empty-message">Aucun rendez-vous</td></tr>';
        return;
    }
    
    appointmentsList.innerHTML = appointments.map((appointment, index) => `
        <tr>
            <td><span class="patient-name">${appointment.patientName}</span></td>
            <td><span class="practitioner-name">${appointment.practitionerName}</span></td>
            <td><span class="appointment-datetime">${formatDateTime(appointment.date, appointment.time)}</span></td>
            <td><span class="room-info">${appointment.room}</span></td>
            <td><span class="consultation-type">${appointment.type}</span></td>
            <td><span class="duration-info">${appointment.duration} min</span></td>
            <td><span class="status-badge status-${appointment.status.toLowerCase()}">${getStatusText(appointment.status)}</span></td>
            <td>
                <button class="edit-btn" onclick="editAppointment(${index})" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadPatients() {
    const data = getData();
    const patients = data.patients || [];
    const patientSelect = document.getElementById('patientSelect');
    
    patientSelect.innerHTML = '<option value="">Sélectionner un patient</option>';
    
    patients.forEach((patient, index) => {
        const option = document.createElement('option');
        option.value = `${patient.name}|${index}`;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
}

function loadPractitioners() {
    const data = getData();
    const appointments = data.appointments || [];
    const practitionerFilter = document.getElementById('practitionerFilter');
    
    // Get unique practitioners from appointments
    const practitioners = [...new Set(appointments.map(app => app.practitionerName))];
    
    practitionerFilter.innerHTML = '<option value="">Tous les praticiens</option>';
    
    practitioners.sort().forEach(practitioner => {
        const option = document.createElement('option');
        option.value = practitioner;
        option.textContent = practitioner;
        practitionerFilter.appendChild(option);
    });
}

function setupEvents() {
    document.getElementById('appointmentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const patientValue = document.getElementById('patientSelect').value;
        const practitionerName = document.getElementById('practitionerName').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const room = document.getElementById('roomNumber').value;
        const type = document.getElementById('consultationType').value;
        const duration = document.getElementById('duration').value;
        const status = document.getElementById('status').value;
        const editIndex = document.getElementById('editIndex').value;
        
        if (!patientValue) {
            alert('Veuillez sélectionner un patient');
            return;
        }
        
        const [patientName, patientIndex] = patientValue.split('|');
        
        const data = getData();
        const appointment = {
            patientName,
            patientIndex: parseInt(patientIndex),
            practitionerName,
            date,
            time,
            room,
            type,
            duration: parseInt(duration),
            status
        };
        
        if (editIndex !== '') {
            data.appointments[editIndex] = appointment;
        } else {
            data.appointments.push(appointment);
        }
        
        saveData(data);
        loadAppointments();
        loadPractitioners();
        document.getElementById('appointmentForm').reset();
        document.getElementById('editIndex').value = '';
        document.getElementById('formTitle').textContent = 'Ajouter un Rendez-vous';
        document.getElementById('saveBtnText').textContent = 'Enregistrer';
        document.getElementById('status').value = 'Scheduled';
    });

    document.getElementById('practitionerFilter').addEventListener('change', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);

    document.getElementById('clearFiltersBtn').addEventListener('click', () => {
        document.getElementById('practitionerFilter').value = '';
        document.getElementById('statusFilter').value = '';
        applyFilters();
    });
}

function applyFilters() {
    const practitionerFilter = document.getElementById('practitionerFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const data = getData();
    const appointments = data.appointments || [];
    
    let filtered = appointments;
    
    // practitioner filter
    if (practitionerFilter) {
        filtered = filtered.filter(appointment => 
            appointment.practitionerName === practitionerFilter
        );
    }
    
    // status filter
    if (statusFilter) {
        filtered = filtered.filter(appointment => 
            appointment.status === statusFilter
        );
    }
    
    const appointmentsList = document.getElementById('appointmentsList');
    if (filtered.length === 0) {
        appointmentsList.innerHTML = '<tr><td colspan="8" class="empty-message">Aucun résultat</td></tr>';
    } else {
        appointmentsList.innerHTML = filtered.map((appointment, index) => {
            const originalIndex = data.appointments.indexOf(appointment);
            return `
                <tr>
                    <td><span class="patient-name">${appointment.patientName}</span></td>
                    <td><span class="practitioner-name">${appointment.practitionerName}</span></td>
                    <td><span class="appointment-datetime">${formatDateTime(appointment.date, appointment.time)}</span></td>
                    <td><span class="room-info">${appointment.room}</span></td>
                    <td><span class="consultation-type">${appointment.type}</span></td>
                    <td><span class="duration-info">${appointment.duration} min</span></td>
                    <td><span class="status-badge status-${appointment.status.toLowerCase()}">${getStatusText(appointment.status)}</span></td>
                    <td>
                        <button class="edit-btn" onclick="editAppointment(${originalIndex})" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function formatDateTime(date, time) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR');
    return `${formattedDate} à ${time}`;
}

function getStatusText(status) {
    const statusMap = {
        'Scheduled': 'Programmé',
        'Completed': 'Terminé',
        'Cancelled': 'Annulé',
        'No-show': 'Absent'
    };
    return statusMap[status] || status;
}

window.editAppointment = function(index) {
    const data = getData();
    const appointment = data.appointments[index];
    
    
    const patientSelect = document.getElementById('patientSelect');
    const patientOption = `${appointment.patientName}|${appointment.patientIndex}`;
    patientSelect.value = patientOption;
    
    document.getElementById('practitionerName').value = appointment.practitionerName;
    document.getElementById('appointmentDate').value = appointment.date;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('roomNumber').value = appointment.room;
    document.getElementById('consultationType').value = appointment.type;
    document.getElementById('duration').value = appointment.duration;
    document.getElementById('status').value = appointment.status;
    document.getElementById('editIndex').value = index;
    
    document.getElementById('formTitle').textContent = 'Modifier Rendez-vous';
    document.getElementById('saveBtnText').textContent = 'Mettre à jour';
};

