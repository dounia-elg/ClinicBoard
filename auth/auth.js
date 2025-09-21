import { getAuthData, updateAuthData } from '../storage/dataManager.js';


export function simpleHash(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash += password.charCodeAt(i);
    }
    return hash.toString();
}

export function checkLockStatus(errorMessage, loginBtn) {
    const authData = getAuthData();
    const lockTime = authData.lockTime;
    const now = Date.now();

    if (lockTime && now < parseInt(lockTime) + 5 * 60 * 1000) {
        const remainingTime = Math.ceil((parseInt(lockTime) + 5 * 60 * 1000 - now) / 1000);
        errorMessage.textContent = `Too many attempts! Try again in ${remainingTime} seconds.`;
        errorMessage.style.display = 'block';
        loginBtn.disabled = true;
        return true;
    } else {
        updateAuthData({ lockTime: null });
        loginBtn.disabled = false;
        errorMessage.style.display = 'none';
        return false;
    }
}

export function authenticate(passwordInput, errorMessage, loginBtn) {
    if (!passwordInput) {
        errorMessage.textContent = 'Please enter a password!';
        errorMessage.style.display = 'block';
        return false;
    }

    const hashedInput = simpleHash(passwordInput);
    const authData = getAuthData();
    const storedHash = authData.passwordHash;
    let attempts = authData.loginAttempts || 0;

    // ila kant first time kandakhlo password jdid
    if (!storedHash) {
        updateAuthData({ passwordHash: hashedInput, loginAttempts: 0, lockTime: null });
        window.isAuthenticated = true;
        errorMessage.style.display = 'none';
        return true;
    }

   
    if (hashedInput === storedHash) {
        updateAuthData({ loginAttempts: 0, lockTime: null });
        window.isAuthenticated = true;
        errorMessage.style.display = 'none';
        return true;
    } else {
        
        if (checkLockStatus(errorMessage, loginBtn)) {
            return false;
        }
        
        attempts += 1;
        updateAuthData({ loginAttempts: attempts });

        if (attempts >= 3) {
            updateAuthData({ lockTime: Date.now().toString() });
            errorMessage.textContent = 'Too many attempts! Try again in 5 minutes.';
            errorMessage.style.display = 'block';
            loginBtn.disabled = true;
        } else {
            errorMessage.textContent = `Wrong password! ${3 - attempts} attempts left.`;
            errorMessage.style.display = 'block';
        }
        return false;
    }
}