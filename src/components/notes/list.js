import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import TodosListView from '../todos/list-view'
import TodosAddView from '../todos/add-view'
import { useQuery, useMutation, gql } from '@apollo/client'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        minWidth: '120px',
        padding: theme.spacing(2),
        '&:hover': {
            boxShadow: '0 0 11px rgba(33,33,33,.2)',
        },
    },
    control: {
        padding: theme.spacing(2),
    },
}))

const GET_NOTES = gql`
query GetNotes {
  notes {
    id
    name    
    todos {
      id
      name
      done
      noteId
    }
  }
}
`

const TOGGLE_TODO = gql`
mutation ToggleTodo($input: ToggleTodoInput!){
  toggleTodo(input: $input) {
    id
    done
    noteId
  }
}
`

const ADD_TODO = gql`
mutation AddTodo($input: AddTodoInput!){
  addTodo(input: $input) {
    id
    name
    done
    noteId
  }
}
`

export default function NotesList() {
    const classes = useStyles()
    const [editingNoteId, setEditingNoteId] = React.useState(-1)
    const { loading, error, data } = useQuery(GET_NOTES)
    const [toggleTodo] = useMutation(TOGGLE_TODO)
    const [addTodo] = useMutation(ADD_TODO, {
        update(cache, { data: { addTodo } }) {
            cache.modify({
                fields: {
                    todos(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: addTodo,
                            fragment: gql`
                              fragment NewTodo on Todo {
                                id
                                name
                                done
                                noteId
                              }
                            `,
                        })
                        return [...existingTodos, newTodoRef]
                    },
                },
            })
        },
    })

    if (loading) {
        return <span>Loading...</span>
    }

    if (error) {
        return <span>{`Error: ${error}`}</span>
    }

    return (
        <Grid container spacing={2} className={classes.root}>
            {data.notes.map(note => (
                <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
                    <Paper className={classes.paper} onMouseEnter={() => setEditingNoteId(note.id)}
                           onMouseLeave={() => setEditingNoteId(-1)}>
                        <Typography variant='h5'>
                            {note.name}
                        </Typography>
                        <TodosListView todos={note.todos}
                                       toggleTodo={todoId => toggleTodo({
                                           variables: {
                                               input: {
                                                   id: todoId,
                                                   noteId: note.id,
                                               },
                                           },
                                       })} />
                        {editingNoteId === note.id &&
                        <TodosAddView addTodo={({ name }) => addTodo({
                            variables: {
                                input: {
                                    name: name,
                                    noteId: note.id,
                                },
                            },
                        })} />}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}