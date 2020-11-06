import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'
import LocalStateProvider from '../state/local'
import { ApolloProvider } from '@apollo/client'
import { client } from '../state/remote'

export default function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <LocalStateProvider>
                    <Container maxWidth="lg">
                        <AppHeader />
                        <AppMessage />
                        <AppRouter />
                    </Container>
                </LocalStateProvider>
            </ApolloProvider>
        </BrowserRouter>
    )
}

