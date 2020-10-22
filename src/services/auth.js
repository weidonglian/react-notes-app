import api, {apiClient} from './api'

const credentialsKey = 'credentials'

/**
 * Provides a base for authentication workflow.
 * The LoginCredentials interface as well as login/logout methods should be replaced with proper implementation.
 */
class AuthService {
    constructor() {
        this._credentials = undefined
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey)
        if (savedCredentials) {
            this.setCredentials(JSON.parse(savedCredentials), true)
        }
    }

    async signup(user) {
        return api.signup(user)
    }

    async login(user) {
        const { token } = await api.login(user)
        this.setCredentials({
            username: user.username,
            access_token: token,
            refresh_token: token,
        }, user.remember)
    }

    async logout() {
        this.setCredentials()
        if (this.isAuthenticated()) {
            await api.logout().catch(err => {
                console.log('logout session with error:', err)
            })

        }
    }

    get username() {
        return this._credentials ? this._credentials.username : null
    }

    isAuthenticated() {
        return !!this._credentials
    }

    get credentials() {
        return this._credentials
    }

    setCredentials(credentials, remember) {
        this._credentials = credentials || null

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

const auth = new AuthService()

export default auth

