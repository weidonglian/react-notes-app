import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'

export default function App () {
    return (
        <BrowserRouter>
            <AppHeader />
            <AppMessage />
            <AppRouter />
        </BrowserRouter>
    )
}

