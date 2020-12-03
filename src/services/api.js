import axios from 'axios'
import config from '../app/config'
import auth from './auth'

const baseURL = config.apiURL

const createApiClient = () => {
    const instance = axios.create({
        baseURL: baseURL,
        responseType: 'json'
    })
    return instance
}

const rawApiClient = createApiClient()

const apiClient = createApiClient()

apiClient.interceptors.request.use(config => {
    if (auth.isAuthenticated()) {
        config.headers.Authorization = `Bearer ${auth.credentials.access_token}`
    }
    return config
})

apiClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.request?.status === 401) {
            auth.resetCredentials()
        }
        throw error
    }
)

const login = async ({ username, password }) => {
    const { data } = await rawApiClient.post('/session', {
        username,
        password
    })
    return data
}

const logout = async () => {
    const { data } = await apiClient.delete('/session')
    return data
}

const signup = async ({ username, password }) => {
    const { data } = await rawApiClient.post('/users/new', {
        username,
        password
    })
    return data
}

const extractErrorMessage = e => {
    return e?.response?.data?.error ? e.response.data.error : String(e)
}

export default { login, logout, signup, extractErrorMessage }