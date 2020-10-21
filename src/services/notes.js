import apiClient from './api'

export const getNotes = async () => {
  const { data } = await apiClient.get('/notes')
  return data
}

export const addNote = async ({ name }) => {
  return apiClient.post('/notes', {
    name,
  })
}