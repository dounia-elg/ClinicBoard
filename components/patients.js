import { getData, saveData } from '../storage/dataManager.js';

export function patientsPage() {
    const div = document.createElement('div');
    div.className = 'patients-page';
    
    
    const style = document.createElement('style');
    style.textContent = `
        .patients-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
            min-height: 100vh;
        }
        
        .search-section {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
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
        
        
         .patients-table-container {
             background: white;
             border-radius: 15px;
             padding: 20px;
             box-shadow: 0 4px 15px rgba(0,0,0,0.1);
             margin-bottom: 40px;
             overflow-x: auto;
         }
         
         .patients-table {
             width: 100%;
             border-collapse: collapse;
             font-size: 16px;
         }
         
         .patients-table th {
             background: #3ba851;
             color: white;
             padding: 15px 12px;
             text-align: left;
             font-weight: bold;
             border-radius: 8px 8px 0 0;
         }
         
         .patients-table td {
             padding: 15px 12px;
             border-bottom: 1px solid #e0e0e0;
             vertical-align: top;
         }
         
         .patients-table tr:hover {
             background: #f8f9fa;
         }
         
         .patients-table tr:last-child td {
             border-bottom: none;
         }
         
         .patient-name {
             font-weight: bold;
             color: #3ba851;
         }
         
         .patient-phone {
             color: #666;
         }
         
         .patient-email {
             color: #666;
         }
         
         .patient-notes {
             color: #666;
             font-style: italic;
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
         
         .delete-btn {
             background: none;
             border: none;
             color: #dc3545;
             cursor: pointer;
             font-size: 18px;
             padding: 5px;
         }
         
         .delete-btn:hover {
             color: #c82333;
         }
        
        
        
        .add-patient-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .add-patient-header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .add-patient-header i {
            width: 40px;
            height: 40px;
            background: #3ba851;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            margin-right: 15px;
        }
        
        .add-patient-header h2 {
            color: #3ba851;
            margin: 0;
            font-size: 24px;
        }
        
        .add-patient-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .form-row input {
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        
        .form-row input:focus {
            outline: none;
            border-color: #3ba851;
        }
        
        .save-btn {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 10px;
            background: #3ba851;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: background 0.3s;
        }
        
        .save-btn:hover {
            background: #2d8a3e;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        .empty-state i {
            font-size: 48px;
            margin-bottom: 20px;
            color: #ccc;
        }
        
        .empty-state p {
            font-size: 18px;
            margin-bottom: 20px;
        }
    `;
    div.appendChild(style);
    
    div.innerHTML += `
        <!-- Search Section -->
        <div class="search-section">
            <input type="text" id="searchInput" placeholder="Rechercher un patient..." class="search-input">
            <button id="searchBtn" class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </div>
        
         <!-- Patients Table -->
         <div class="patients-table-container">
             <table class="patients-table">
                  <thead>
                      <tr>
                          <th>Nom</th>
                          <th>Téléphone</th>
                          <th>E-mail</th>
                          <th>Notes</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                 <tbody id="patientsList">
                     <!-- Patients will be loaded here -->
                 </tbody>
             </table>
         </div>
        
        <!-- Add Patient Form -->
        <div class="add-patient-section">
            <div class="add-patient-header">
                <i class="fas fa-plus"></i>
                <h2>Ajouter un Patient</h2>
            </div>
             <form id="patientForm" class="add-patient-form">
                 <input type="hidden" id="editIndex" value="">
                 <div class="form-row">
                     <input type="text" id="patientName" placeholder="Nom complet" required>
                     <input type="tel" id="patientPhone" placeholder="Téléphone" required>
                 </div>
                 <div class="form-row">
                     <input type="email" id="patientEmail" placeholder="E-mail">
                     <input type="text" id="patientNotes" placeholder="Notes">
                 </div>
                 <button type="submit" class="save-btn">
                     <i class="fas fa-save"></i>
                     <span id="saveBtnText">Enregistrer</span>
                 </button>
             </form>
        </div>
    `;
    
   
    setTimeout(() => {
        loadPatients();
        setupEventListeners();
    }, 0);
    
    return div;
}

function loadPatients() {
    const data = getData();
    const patients = data.patients || [];
    const patientsList = document.getElementById('patientsList');
    
    if (patients.length === 0) {
        patientsList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-users" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                    Aucun patient enregistré
                </td>
            </tr>
        `;
        return;
    }
    
    patientsList.innerHTML = patients.map((patient, index) => `
        <tr>
            <td class="patient-name">${patient.name}</td>
            <td class="patient-phone">${patient.phone}</td>
            <td class="patient-email">${patient.email || '-'}</td>
            <td class="patient-notes">${patient.notes || '-'}</td>
            <td>
                <button class="edit-btn" onclick="editPatient(${index})" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deletePatient(${index})" title="Supprimer">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function setupEventListeners() {
    
    document.getElementById('patientForm')?.addEventListener('submit', savePatient);
    
    
    document.getElementById('searchBtn')?.addEventListener('click', searchPatients);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPatients();
    });
}

function searchPatients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const data = getData();
    const patients = data.patients || [];
    
    if (!searchTerm) {
        loadPatients();
        return;
    }
    
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm) || 
        patient.phone.includes(searchTerm) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm)) ||
        (patient.notes && patient.notes.toLowerCase().includes(searchTerm))
    );
    
    const patientsList = document.getElementById('patientsList');
    
    if (filteredPatients.length === 0) {
        patientsList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                    Aucun patient trouvé pour "${searchTerm}"
                </td>
            </tr>
        `;
        return;
    }
    
    patientsList.innerHTML = filteredPatients.map((patient, index) => {
        const originalIndex = data.patients.indexOf(patient);
        return `
            <tr>
                <td class="patient-name">${patient.name}</td>
                <td class="patient-phone">${patient.phone}</td>
                <td class="patient-email">${patient.email || '-'}</td>
                <td class="patient-notes">${patient.notes || '-'}</td>
                <td>
                    <button class="edit-btn" onclick="editPatient(${originalIndex})" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePatient(${originalIndex})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function savePatient(e) {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('patientPhone').value;
    const email = document.getElementById('patientEmail').value;
    const notes = document.getElementById('patientNotes').value;
    const editIndex = document.getElementById('editIndex').value;
    
    const data = getData();
    const patient = { name, phone, email, notes };
    
    if (editIndex !== '') {
        //modifier patient deja kayn
        data.patients[editIndex] = patient;
    } else {
        // nzidou patient jdid
        data.patients.push(patient);
    }
    
    saveData(data);
    loadPatients();
    
    // Clear form
    document.getElementById('patientForm').reset();
    document.getElementById('editIndex').value = '';
    document.getElementById('saveBtnText').textContent = 'Enregistrer';
}


window.editPatient = function(index) {
    const data = getData();
    const patient = data.patients[index];
    
    
    document.getElementById('patientName').value = patient.name;
    document.getElementById('patientPhone').value = patient.phone;
    document.getElementById('patientEmail').value = patient.email || '';
    document.getElementById('patientNotes').value = patient.notes || '';
    document.getElementById('editIndex').value = index;
    
    
    document.getElementById('saveBtnText').textContent = 'Mettre à jour';
};


window.deletePatient = function(index) {
    
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
        const data = getData();
        
        
        data.patients.splice(index, 1);
        
        
        saveData(data);
        
       
        loadPatients();
    }
};

