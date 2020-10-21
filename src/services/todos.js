import apiClient from './api'

export const addTodo = async ({ noteId, name }) => {
  const { data } = await apiClient.post('/todos', {
    name, noteId,
  })
  return data
}

export const updateTodo = async ({ id, name, done }) => {
  const { data } = await apiClient.put(`/todos/${id}`, {
    name, done
  })
  return data
}

export const toggleTodo = async ({id}) => {
  const { data } = await  apiClient.put(`/todos/${id}/toggle`)
  return data
}