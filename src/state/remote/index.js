import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import config from '../../app/config'
import { setContext } from '@apollo/client/link/context'
import auth from '../../services/auth'
import { onError } from '@apollo/client/link/error'

const baseURL = config.apiURL

const httpLink = createHttpLink({
    uri: `${baseURL}/graphql`,
})

const authLink = setContext((_, { headers, ...context }) => {
    const token = auth.credentials?.access_token
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...context,
    }
})

const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) auth.resetCredentials();
})

export const client = new ApolloClient({
    link: ApolloLink.from([logoutLink, authLink, httpLink]),
    cache: new InMemoryCache(),
})