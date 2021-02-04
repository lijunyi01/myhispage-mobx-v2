export function getToken() {
    return localStorage.getItem('token');
}
export function setToken(token) {
    localStorage.setItem('token', token);
}
export function removeToken(token) {
    localStorage.removeItem('token');
}

export function getUmid() {
    return localStorage.getItem('umid');
}
export function setUmid(umid) {
    return localStorage.setItem('umid', umid);
}

export function isLogined() {
    if (getToken()) {
        return true;
    } else {
        return false;
    }
}