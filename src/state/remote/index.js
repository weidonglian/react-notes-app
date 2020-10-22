import { useMutation, useQuery, useQueryCache } from 'react-query'
import api from '../../services/api'
import produce from 'immer'

export const queryKeys = {
    notes: "notes"
}

export const useQueryNotes = () => useQuery(queryKeys.notes, api.getNotes)

export const useMutationAddNote = () => {
    const queryCache = useQueryCache()
    return useMutation(api.addNote, {
        onSuccess: data => {
            const old = queryCache.getQueryData('notes')
            queryCache.setQueryData('notes', [...old, data])
        },
    })
}

export const useMutationAddTodo = () => {
    const queryCache = useQueryCache()
    return useMutation(api.addTodo, {
        onSuccess: data => {
            const oldNotes = queryCache.getQueryData(queryKeys.notes)
            const newNotes = produce(oldNotes, n => {
                const noteIndex = n.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    n[noteIndex].todos.push(data)
                }
            })
            queryCache.setQueryData(queryKeys.notes, newNotes)
        },
    })
}

export const useMutationToggleTodo = () => {
    const queryCache = useQueryCache()
    return useMutation(api.toggleTodo, {
        onSuccess: data => {
            const oldNotes = queryCache.getQueryData(queryKeys.notes)
            const newNotes = produce(oldNotes, n => {
                const noteIndex = n.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    const todoIndex = n[noteIndex].todos.findIndex(todo => todo.id === data.id)
                    if (todoIndex > -1) {
                        n[noteIndex].todos[todoIndex].done = data.done
                    }
                }
            })
            queryCache.setQueryData(queryKeys.notes, newNotes)
        },
    })
}