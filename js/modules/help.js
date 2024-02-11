export const help = {
    // ... existing properties and methods

    saveToken(token) {
        localStorage.setItem('authToken', token);
    },

    getToken() {
        console.log("localstorage:", localStorage.getItem('authToken'));
        return localStorage.getItem('authToken');
    },

    deleteToken() {
        localStorage.removeItem('authToken');
    },

    // ... remaining properties and methods
};