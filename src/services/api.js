import axios from 'axios'

const baseURL = 'http://localhost:4000'

const createApiClient = () => {
    return axios.create({
        baseURL: baseURL,
        responseType: 'json'
    })
}

const apiClient = createApiClient()
export default apiClient