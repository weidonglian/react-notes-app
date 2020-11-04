import axios from 'axios'
import config from '../app/config'

const baseURL = config.apiURL

const createApiClient = () => {
    return axios.create({
        baseURL: baseURL,
        responseType: 'json',
    })
}

export const apiClient = createApiClient()

const login = async ({ username, password }) => {
    const { data } = await apiClient.post('/session', {
        username,
        password,
    })
    return data
}

const logout = async () => {
    const { data } = await apiClient.delete('/session')
    return data
}

const signup = async ({ username, password }) => {
    const { data } = await apiClient.post('/users/new', {
        username,
        password,
    })
    return data
}

const extractErrorMessage = e => {
    return e?.response?.data?.error ? e.response.data.error : String(e)
}

export default { login, logout, signup, extractErrorMessage }