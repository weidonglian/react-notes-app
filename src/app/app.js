import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'
import AppStateProvider from '../state'

export default function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <AppHeader />
        <AppMessage />
        <AppRouter />
      </AppStateProvider>
    </BrowserRouter>
  )
}

