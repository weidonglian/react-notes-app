import { apiClient } from './request';

const credentialsKey = 'credentials'

/**
 * Provides a base for authentication workflow.
 * The LoginCredentials interface as well as login/logout methods should be replaced with proper implementation.
 */
class AuthService {
    constructor() {
        this._credentials = undefined
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this.setCredentials(JSON.parse(savedCredentials), true);
        }
    }

    signup(user) {
        return apiClient.post('/auth/signup', {
            username: user.username,
            password: user.password
        })
    }

    async login(user) {
        const respLogin = await apiClient.post('/auth/login', {
            username: user.username,
            password: user.password
        })
        const { token } = respLogin.data
        this.setCredentials({
            username: user.username,
            access_token: token,
            refresh_token: token
        }, user.remember)
    }

    logout() {
        this.setCredentials();
        if (this.isAuthenticated()) {
            // TODO request remote server /logout
        }
    }

    get username() {
        return this._credentials ? this._credentials.username : null
    }

    isAuthenticated() {
        return !!this._credentials
    }

    get credentials() {
        return this._credentials;
    }

    setCredentials(credentials, remember) {
        this._credentials = credentials || null;

        if (credentials) {
            const storage = remember ? localStorage : sessionStorage
            storage.setItem(credentialsKey, JSON.stringify(credentials))
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${credentials.access_token}`
        } else {
            sessionStorage.removeItem(credentialsKey)
            localStorage.removeItem(credentialsKey)
            apiClient.defaults.headers.common['Authorization'] = null
        }
    }
}

export default auth = new AuthService()

