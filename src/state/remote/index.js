import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split} from '@apollo/client'
import config from '../../app/config'
import {setContext} from '@apollo/client/link/context'
import auth from '../../services/auth'
import {onError} from '@apollo/client/link/error'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'
import {SubscriptionClient} from 'subscriptions-transport-ws'

const withAuthHeaders = (headers) => {
    const token = auth?.accessToken
    return token ? {...headers, Authorization: `Bearer ${token}`} : headers
}

const baseURL = config.apiURL
const baseWsURL = config.wsURL

const httpLink = createHttpLink({
    uri: `${baseURL}/graphql`,
})

const subscriptionClient = new SubscriptionClient(`${baseWsURL}/graphql`, {
    reconnect: true,
    timeout: 30000,
    lazy: true,
    connectionParams: () => withAuthHeaders({})
})

const wsLink = new WebSocketLink(subscriptionClient)

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
    return {
        headers: withAuthHeaders(headers),
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