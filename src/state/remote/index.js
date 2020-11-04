import { useMutation, useQuery, useQueryCache } from 'react-query'
import api from '../../services/api'
import produce from 'immer'

export const queryKeys = {
    notes: 'notes',
}

export const useQueryNotes = () => useQuery(queryKeys.notes, api.getNotes)

export const useMutationAddNote = () => {
    const queryCache = useQueryCache()
    return useMutation(api.addNote, {
        onSuccess: data => {
            queryCache.setQueryData(queryKeys.notes, old => [...old, data])
        },
    })
}

export const useMutationAddTodo = () => {
    const queryCache = useQueryCache()
    return useMutation(api.addTodo, {
        onSuccess: data => {
            queryCache.setQueryData(queryKeys.notes, old => produce(old, s => {
                const noteIndex = s.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    s[noteIndex].todos.push(data)
                }
            }))
        },
    })
}

export const useMutationToggleTodo = () => {
    const queryCache = useQueryCache()
    return useMutation(api.toggleTodo, {
        onSuccess: data => {
            queryCache.setQueryData(queryKeys.notes, old => produce(old, s => {
                const noteIndex = s.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    const todoIndex = s[noteIndex].todos.findIndex(todo => todo.id === data.id)
                    if (todoIndex > -1) {
                        s[noteIndex].todos[todoIndex].done = data.done
                    }
                }
            }))
        },
    })
}