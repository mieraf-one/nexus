const ACCESS = 'access';
const REFRESH = 'refresh';
const USERNAME = 'username'

export function getAccessToken() {
    return localStorage.getItem(ACCESS);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH)
}

export function getUsername() {
    return localStorage.getItem(USERNAME);
}

export function saveTokens( access, refresh, username) {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
    localStorage.setItem(USERNAME, username)
}

export function clearTokens() {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    localStorage.removeItem(USERNAME)
}

export function isAccessExpired(token) {}
