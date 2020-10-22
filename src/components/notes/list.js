import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import TodosListView from '../todos/list-view'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import notesAPI from '../../services/notes'
import todosAPI from '../../services/todos'
import TodosAddView from '../todos/add-view'
import produce from 'immer'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        minWidth: '120px',
        padding: theme.spacing(2),
        '&:hover': {
            borderStyle: 'solid',
        },
    },
    control: {
        padding: theme.spacing(2),
    },
}))

export default function NotesList() {
    const classes = useStyles()
    const [editingNoteId, setEditingNoteId] = React.useState(-1)
    const notes = useQuery('notes', notesAPI.getNotes)
    const queryCache = useQueryCache()
    const [addTodo] = useMutation(todosAPI.addTodo, {
        onSuccess: data => {
            const oldNotes = queryCache.getQueryData('notes')
            const newNotes = produce(oldNotes, n => {
                const noteIndex = n.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    n[noteIndex].todos.push(data)
                }
            })
            queryCache.setQueryData('notes', newNotes)
        },
    })
    const [toggleTodo] = useMutation(todosAPI.toggleTodo, {
        onSuccess: data => {
            const oldNotes = queryCache.getQueryData('notes')
            const newNotes = produce(oldNotes, n => {
                const noteIndex = n.findIndex(note => note.id === data.noteId)
                if (noteIndex > -1) {
                    const todoIndex = n[noteIndex].todos.findIndex(todo => todo.id === data.id)
                    if (todoIndex > -1) {
                        n[noteIndex].todos[todoIndex].done = data.done
                    }
                }
            })
            queryCache.setQueryData('notes', newNotes)
        },
    })

    if (notes.isLoading) {
        return <span>Loading...</span>
    }

    if (notes.isError) {
        return <span>Error: {notes.error.message}</span>
    }

    return (
        <Grid container spacing={2} className={classes.root}>
            {notes.data.map(note => (
                <Grid key={note.id} item xs={4}>
                    <Paper className={classes.paper} onMouseEnter={() => setEditingNoteId(note.id)}
                           onMouseLeave={() => setEditingNoteId(-1)}>
                        <Typography variant='h5'>
                            {note.name}
                        </Typography>
                        <TodosListView todos={note.todos}
                                       toggleTodo={todoId => toggleTodo({ id: todoId })} />
                        {editingNoteId === note.id &&
                        <TodosAddView addTodo={({ name }) => addTodo({ noteId: note.id, name })} />}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}