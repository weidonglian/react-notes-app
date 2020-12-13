import api from './api'
import { client } from '../state/remote'

const credentialsKey = 'credentials'

/**
 * Provides a base for authentication workflow.
 * The LoginCredentials interface as well as login/logout methods should be replaced with proper implementation.
 */
class AuthService {
    constructor() {
        this._credentials = null
        // load from storage if available
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey)
        if (savedCredentials) {
            try {
                this._credentials = JSON.parse(savedCredentials)
            } catch (e) {
                console.log("failed to parse credential: ", e)
                this._credentials = null
            }
        }
    }

    get username() {
        return this._credentials?.username
    }

    get credentials() {
        return this._credentials
    }

    get accessToken() {
        return this._credentials?.access_token
    }

    async login(user) {
        const { token } = await api.login(user)
        this.setAndStoreCredentials({
            username: user.username,
            access_token: token,
            refresh_token: token,
        }, user.remember)
        await client.resetStore()
        await client.cache.reset()
    }

    async logout() {
        if (this.isAuthenticated()) {
            await api.logout().catch(err => {
                console.log('logout session with error:', err)
            })
        }
        this.resetCredentials()
        await client.clearStore()
        await client.cache.reset()
    }

    isAuthenticated() {
        return !!this._credentials
    }

    resetCredentials() {
        this._credentials = null
        sessionStorage.removeItem(credentialsKey)
        localStorage.removeItem(credentialsKey)
    }

    setAndStoreCredentials(credentials, remember) {
        this._credentials = credentials || null
        sessionStorage.removeItem(credentialsKey)
        localStorage.removeItem(credentialsKey)
        if (this._credentials) {
            const storage = remember ? localStorage : sessionStorage
            storage.setItem(credentialsKey, JSON.stringify(this._credentials))
        }
    }
}

const auth = new AuthService()

export default auth

