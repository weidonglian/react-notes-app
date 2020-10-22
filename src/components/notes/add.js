import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQueryCache } from 'react-query'
import notesAPI from '../../services/notes'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
}))

export default function NotesAdd() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const queryCache = useQueryCache()
    const [addNote] = useMutation(notesAPI.addNote, {
        onSuccess: data => {
            const old = queryCache.getQueryData('notes')
            queryCache.setQueryData('notes', [...old, data])
        },
    })
const classes = useStyles()

const handleClose = () => {
    setOpen(false)
}

const handleSubmit = () => {
    handleClose()
    if (name) {
        addNote({name}).catch(err => {
            console.log("addNote with error:", err)
        })
    }
}

const onChangeName = e => {
    const valName = e.target.value
    setName(valName)
}

const onClickAddNote = () => {
    setOpen(true)
    setName('')
}

return (
    <>
        <Fab color="secondary" aria-label="add" size="small" className={classes.fab}
             onClick={onClickAddNote}>
            <AddIcon />
        </Fab>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create a new note:</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={onChangeName}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </>
)
}