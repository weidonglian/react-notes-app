import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split} from '@apollo/client'
import config from '../../app/config'
import {setContext} from '@apollo/client/link/context'
import auth from '../../services/auth'
import {onError} from '@apollo/client/link/error'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'

const baseURL = config.apiURL
const baseWsURL = config.wsURL

const httpLink = createHttpLink({
    uri: `${baseURL}/graphql`,
})

const wsLink = new WebSocketLink({
    uri: `${baseWsURL}/graphql`,
    options: {
        reconnect: true,
    },
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
)

const authLink = setContext((_, {headers, ...context}) => {
    const token = auth.credentials?.access_token
    return {
        headers: {
            ...headers,
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
        },
        ...context,
    }
})

const logoutLink = onError(({networkError}) => {
    if (networkError.statusCode === 401) auth.resetCredentials()
})

export const client = new ApolloClient({
    link: ApolloLink.from([logoutLink, authLink, splitLink]),
    cache: new InMemoryCache(),
})