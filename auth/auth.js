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