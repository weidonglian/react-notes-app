import { Box, Checkbox } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

export default function TodosListView({ todos, toggleTodo, deleteTodo }) {
    const [editingTodoId, setEditingTodoId] = useState(-1)
    return (
        <Box p={0}>
            <List disablePadding={true}>
                {todos.map(todo => {
                    return (
                        <ListItem key={todo.id} dense button onClick={() => toggleTodo(todo.id)}
                                  onMouseOver={() => setEditingTodoId(todo.id)}
                                  onMouseLeave={() => setEditingTodoId(-1)}>
                            <Checkbox
                                edge="start"
                                checked={todo.done}
                                tabIndex={-1}
                            />
                            <ListItemText primary={todo.name} />
                            {editingTodoId === todo.id &&
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                                    <ClearIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            }
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}