const ACCESS = 'access';
const REFRESH = 'refresh';

export function getAccessToken() {
    return localStorage.getItem(ACCESS);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH)
}

export function saveTokens({ access, refresh }) {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
}

export function clearTokens() {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
}

export function isAccessExpired(token) {}
