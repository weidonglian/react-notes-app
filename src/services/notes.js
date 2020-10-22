import apiClient from './api'

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

export default { getNotes, addNote }