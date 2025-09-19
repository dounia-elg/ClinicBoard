export function loginPage() {
    
    document.getElementsByTagName('nav')[0].style.display = 'none';
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
        `;
        document.head.appendChild(style);
    }
    const section = document.createElement('section');
    section.className = 'login-section';
    const container = document.createElement('div');
    container.className = 'login-container';
    container.innerHTML = `
        <h2><i class="fas fa-clinic-medical"></i>ClinicBoard</h2>
        <input type="password" placeholder="Password">
        <button>Login</button>
        <div class="illustration"><i class="fas fa-user-doctor"></i></div>
    `;
    section.appendChild(container);
    return section;

}