export function simpleHash(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash += password.charCodeAt(i);
    }
    return hash.toString();
}