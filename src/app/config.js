const devConfig = {
    apiURL: `http://localhost:4000`,
    wsURL: `ws://localhost:4000`,
}

const prodConfig = {
    apiURL: `https://wd-notes-app.herokuapp.com`,
    wsURL: `wss://wd-notes-app.herokuapp.com`
}

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig