import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { auth } from '../services/auth'

const PrivateRoute = props => (
    <>
        {auth.isAuthenticated() ? props.children : <Redirect to='/login' />}
    </>
)

const RestrictedRoute = props => (
    <>
        {auth.isAuthenticated() ? <Redirect to='/' /> : props.children}
    </>
)

export default AppRouter = props => (
    <Switch>
        <Route exact path='/'>
            <Redirect to='/notes' />
        </Route>
        <Route exact path='/signup' component={SignupPage} />
        <RestrictedRoute exact path='/login'>
            <LoginPage />
        </RestrictedRoute>
        <PrivateRoute exact path='/notes'>
            <NotesPage />
        </PrivateRoute>
    </Switch>
)