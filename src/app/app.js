import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from './router'
import AppHeader from './header'
import AppMessage from './message'
import AppStateProvider from '../state/local'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

const queryCache = new QueryCache()

export default function App() {
    return (
        <HashRouter>
            <BrowserRouter>
                <ReactQueryCacheProvider queryCache={queryCache}>
                    <AppStateProvider>
                        <AppHeader />
                        <AppMessage />
                        <AppRouter />
                    </AppStateProvider>
                    <ReactQueryDevtools initialIsOpen />
                </ReactQueryCacheProvider>
            </BrowserRouter>
        </HashRouter>
    )
}

