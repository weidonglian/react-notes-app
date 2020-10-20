import React from 'react'
import { NotesPage } from '../../pages/Notes'
import { LoginPage } from '../../pages/Login'
import { SignupPage } from '../../pages/Signup'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'

export const App = () => {
    return (
        <Router>
            <AppHeader />
            <AppMessage />
            <AppRouter />
        </Router>
    )
}

