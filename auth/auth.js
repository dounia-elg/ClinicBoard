export function simpleHash(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash += password.charCodeAt(i);
    }
    return hash.toString();
}

export function checkLockStatus(errorMessage, loginBtn) {
    const lockTime = localStorage.getItem('lockTime');
    const now = Date.now();

    if (lockTime && now < parseInt(lockTime) + 5 * 60 * 1000) {
        const remainingTime = Math.ceil((parseInt(lockTime) + 5 * 60 * 1000 - now) / 1000);
        errorMessage.textContent = `Too many attempts! Try again in ${remainingTime} seconds.`;
        errorMessage.style.display = 'block';
        loginBtn.disabled = true;
        return true;
    } else {
        localStorage.removeItem('lockTime');
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
    let storedHash = localStorage.getItem('passwordHash');

    let attempts = parseInt(localStorage.getItem('loginAttempts') || '0');

    const now = Date.now();
    if (checkLockStatus(errorMessage, loginBtn)) {
        return false;
    }

    if (!storedHash) {
        localStorage.setItem('passwordHash', hashedInput);
        window.isAuthenticated = true;
        localStorage.setItem('loginAttempts', '0');
        errorMessage.style.display = 'none';
        return true;
    } else {
        if (hashedInput === storedHash) {
            window.isAuthenticated = true;
            localStorage.setItem('loginAttempts', '0');
            errorMessage.style.display = 'none';
            return true;
        } else {
            attempts += 1;
            localStorage.setItem('loginAttempts', attempts.toString());

            if (attempts >= 3) {
                localStorage.setItem('lockTime', now.toString());
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
}