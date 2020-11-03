import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'
import LocalStateProvider from '../state/local'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

const queryCache = new QueryCache()

export default function App() {
    return (
        <BrowserRouter>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <LocalStateProvider>
                    <AppHeader />
                    <AppMessage />
                    <AppRouter />
                </LocalStateProvider>
                <ReactQueryDevtools initialIsOpen />
            </ReactQueryCacheProvider>
        </BrowserRouter>
    )
}

