import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import TodosListView from '../todos/list-view'
import { useMutation, useQuery } from 'react-query'
import { getNotes } from '../../services/notes'
import { addTodo, toggleTodo } from '../../services/todos'

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

function NotesListView({ notes, toggleTodo, addTodo }) {
  const classes = useStyles()
  const [editingNoteId, setEditingNoteId] = React.useState(-1)
  return (
    <Grid container spacing={2} className={classes.root}>
      {notes.map(note => (
        <Grid key={note.id} item xs={4}>
          <Paper className={classes.paper} onMouseEnter={() => setEditingNoteId(note.id)}
                 onMouseLeave={() => setEditingNoteId(-1)}>
            <Typography variant='h5'>
              {note.name}
            </Typography>
            <TodosListView todos={note.todos}
                           toggleTodo={todoId => toggleTodo(note.id, todoId)} />
            {editingNoteId === note.id &&
            <TodosListView addTodo={todoName => addTodo(note.id, todoName)} />}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default function NotesList() {
  const { data: notes } = useQuery("notes", getNotes)
  const [mutAddTodo] = useMutation(addTodo)
  const [mutToggleTodo] = useMutation(toggleTodo)
  return <NotesListView notes={notes} addTodo={mutAddTodo} toggleTodo={mutToggleTodo()} />
}