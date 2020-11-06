import { Box, Checkbox } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

export default function TodosListView({ todos, toggleTodo, deleteTodo }) {
    return (
        <Box p={0}>
            <List>
                {todos.map(todo => {
                    const labelId = `checkbox-list-label-${todo.id}`

                    return (
                        <ListItem key={todo.id} role={undefined} dense button onClick={() => toggleTodo(todo.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todo.done}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todo.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="remove" onClick={()=> deleteTodo(todo.id)}>
                                    <ClearIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}