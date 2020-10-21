import React from 'react'
import { NotesList } from '../components/notes/list'
import { NotesAdd } from '../components/notes/add'

export default function NotesPage() {
  return (
    <>
      <NotesAdd />
      <NotesList />
    </>
  )
}