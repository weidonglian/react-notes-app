import {makeStyles, Typography} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React, {useEffect} from 'react'
import TodosListView from '../todos/list-view'
import TodosAddView from '../todos/add-view'
import {gql, useMutation, useQuery} from '@apollo/client'
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

const OnNoteAdded = gql`
  subscription OnNoteAdded {
    noteAdded {
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

const DELETE_TODO = gql`
mutation DeleteTodo($input: DeleteTodoInput!){
  deleteTodo(input: $input) {
    id
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
    const {loading, error, data, subscribeToMore} = useQuery(GET_NOTES)

    useEffect(() => {
        subscribeToMore({
            document: OnNoteAdded,
            updateQuery: (prev, {subscriptionData}) => {
                if (subscriptionData.data) {
                    const {noteAdded} = subscriptionData.data
                    if (prev.notes.findIndex(note => note.id === noteAdded.id) === -1) {
                        return produce(prev, draft => {
                            draft.notes = [...draft.notes, noteAdded]
                        })
                    }
                }
                return prev
            },
        })
    }, [subscribeToMore])

    const [toggleTodo] = useMutation(TOGGLE_TODO)
    const [addTodo] = useMutation(ADD_TODO, {
        update(cache, {data: {addTodo}}) {
            cache.modify({
                id: `Note:${addTodo.noteId}`,
                fields: {
                    todos(existingTodoRefs = [], {toReference}) {
                        return [...existingTodoRefs, toReference(addTodo)]
                    },
                },
            })
        },
    })

    const [deleteTodo] = useMutation(DELETE_TODO, {
        update(cache, {data: {deleteTodo}}) {
            cache.evict({id: `Todo:${deleteTodo.id}`})
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
                    <Paper className={classes.paper}>
                        <Typography variant='h5'>
                            {note.name}
                        </Typography>
                        <TodosListView todos={note.todos}
                                       deleteTodo={todoId => deleteTodo({
                                           variables: {
                                               input: {
                                                   id: todoId,
                                                   noteId: note.id,
                                               },
                                           },
                                       })}
                                       toggleTodo={todoId => toggleTodo({
                                           variables: {
                                               input: {
                                                   id: todoId,
                                                   noteId: note.id,
                                               },
                                           },
                                       })}/>
                        <TodosAddView addTodo={({name}) => addTodo({
                            variables: {
                                input: {
                                    name: name,
                                    noteId: note.id,
                                },
                            },
                        })}/>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}