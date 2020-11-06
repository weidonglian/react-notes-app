import { InputAdornment, InputBase } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    input: {
        // marginLeft: theme.spacing(2),
        flex: 1,
    },
}))

export default function TodosAddView({ addTodo }) {

    const [name, setName] = useState('')

    const inputChanged = evt => {
        const valName = evt.target.value
        setName(valName)
    }

    const keyPressed = e => {
        if (e.keyCode === 13) { // Enter key
            handleAdd()
        }
    }

    const handleAdd = () => {
        if (name) {
            addTodo({ name })
            setName('')
        }
    }


    const classes = useStyles()

    return (
        <>
            <InputBase
                className={classes.input}
                onKeyDown={keyPressed}
                value={name}
                onChange={inputChanged}
                placeholder="Add list item here"
                inputProps={{ 'aria-label': 'add list item here' }}
                startAdornment={
                    <InputAdornment position="start">
                        <AddIcon color='disabled' />
                    </InputAdornment>
                }
            />
        </>
    )
}