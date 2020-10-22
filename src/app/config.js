const devConfig = {
    apiURL: `http://localhost:4000`
}

const prodConfig = {
    apiURL: `https://notes.api.biosave.org`
}

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig