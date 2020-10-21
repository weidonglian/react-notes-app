import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

export default function TodosListView({ todos, toggleTodo }) {
  return (
    <Box p={0}>
      <FormGroup>
        {todos.map(todo => (
          <FormControlLabel key={todo.id}
                            control={<Checkbox checked={todo.done} onChange={() => toggleTodo(todo.id)} />}
                            label={todo.name}
          />),
        )}
      </FormGroup>
    </Box>
  )
}