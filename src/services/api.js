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
    const { data } = await  apiClient.delete('/session')
    return data
}

const signup = async ({ username, password }) => {
    const { data } = await apiClient.post('/users/new', {
        username,
        password,
    })
    return data
}

const getNotes = async () => {
    const { data } = await apiClient.get('/notes')
    return data
}

const addNote = async ({ name }) => {
    const { data } = await apiClient.post('/notes', {
        name,
    })
    return data
}

const addTodo = async ({ noteId, name }) => {
    const { data } = await apiClient.post('/todos', {
        name, noteId,
    })
    return data
}

const updateTodo = async ({ id, name, done }) => {
    const { data } = await apiClient.put(`/todos/${id}`, {
        name, done,
    })
    return data
}

const toggleTodo = async ({ id }) => {
    const { data } = await apiClient.put(`/todos/${id}/toggle`)
    return data
}

export default { login, logout, signup, getNotes, addNote, addTodo, updateTodo, toggleTodo }