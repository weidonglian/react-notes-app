import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import config from '../../app/config'
import { setContext } from '@apollo/client/link/context'
import auth from '../../services/auth'

const baseURL = config.apiURL

const httpLink = createHttpLink({
    uri: `${baseURL}/graphql`,
})

const authLink = setContext((_, { headers }) => {
    const token = auth.credentials?.access_token
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})