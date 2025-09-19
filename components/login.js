import { authenticate } from '../auth/auth.js'; 

export function loginPage() {
    window.isAuthenticated = window.isAuthenticated || false;

    const nav = document.getElementsByTagName('nav')[0];
    if (nav) nav.style.display = 'none';

    if (!document.getElementById('login-style')) {
        const style = document.createElement('style');
        style.id = 'login-style';
        style.textContent = `
            .login-container { 
                background:white; 
                padding:50px; 
                border-radius:12px; 
                box-shadow:0 4px 15px rgba(0,0,0,0.2); 
                text-align:center; 
                width:320px; 
            }
            .login-container h2 { 
                margin-bottom:20px; 
                color:#2E7D32; 
            }
            .login-container input { 
                width:100%; 
                padding:12px; 
                margin-bottom:15px; 
                border-radius:8px; 
                border:1px solid #ccc; 
                font-size:14px; 
            }
            .login-container button { 
                width:100%; 
                padding:12px; 
                border:none; 
                border-radius:8px; 
                background:#2E7D32; 
                color:white; 
                font-size:16px; 
                cursor:pointer; 
                transition:0.3s; 
            }
            .login-container button:hover { 
                background:#256029; 
            }
            .login-container button:disabled { 
                background:#ccc; 
                cursor:not-allowed; 
            }
            .login-container .illustration { 
                margin-top:20px; 
                font-size:50px; 
                color:#2E7D32; 
            }
            .login-section {
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .error-message {
                color: red;
                margin-top: 10px;
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    const section = document.createElement('section');
    section.className = 'login-section';
    const container = document.createElement('div');
    container.className = 'login-container';
    container.innerHTML = `
        <h2><i class="fas fa-clinic-medical"></i> ClinicBoard</h2>
        <input type="password" id="password" placeholder="Password">
        <button id="login-btn">Login</button>
        <div class="illustration"><i class="fas fa-user-doctor"></i></div>
        <p id="error-message" class="error-message"></p>
    `;
    section.appendChild(container);

    
    setTimeout(() => {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.onclick = function() {
                const passwordInput = document.getElementById('password').value;
                const errorMessage = document.getElementById('error-message');
                if (authenticate(passwordInput, errorMessage, loginBtn)) {
                    location.hash = 'dashboard';
                }
            };
        }
    }, 0);

    return section;
}