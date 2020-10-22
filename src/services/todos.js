import apiClient from './api'

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

export default { addTodo, updateTodo, toggleTodo }