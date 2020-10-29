import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import TodosListView from '../todos/list-view'
import TodosAddView from '../todos/add-view'
import { useMutationAddTodo, useMutationToggleTodo, useQueryNotes } from '../../state/remote'

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
    const notes = useQueryNotes()
    const [addTodo] = useMutationAddTodo()
    const [toggleTodo] = useMutationToggleTodo()

    if (notes.isLoading) {
        return <span>Loading...</span>
    }

    if (notes.isError) {
        return <span>Error: {notes.error.message}</span>
    }

    return (
        <Grid container spacing={2} className={classes.root}>
            {notes.data.map(note => (
                <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
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