
const DATA_KEY = 'clinicApp:data';

// njibou data mn localstorage
export function getData() {
    const data = localStorage.getItem(DATA_KEY);
    if (!data) {
        // ndakhlou new data ila kant khawya
        const newData = {
            auth: { passwordHash: null, loginAttempts: 0, lockTime: null },
            patients: [],
            appointments: [],
            cash: { revenues: [], expenses: [] }
        };
        localStorage.setItem(DATA_KEY, JSON.stringify(newData));
        return newData;
    }
    return JSON.parse(data);
}

// save data f localstorage
export function saveData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}


export function getAuthData() {
    return getData().auth;
}


export function updateAuthData(authData) {
    const data = getData();
    data.auth = { ...data.auth, ...authData };
    saveData(data);
}
