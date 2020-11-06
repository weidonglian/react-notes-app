import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import config from '../../app/config'
import { setContext } from '@apollo/client/link/context'
import auth from '../../services/auth'

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

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})