const devConfig = {
    apiURL: `http://localhost:4000`
}

const prodConfig = {
    apiURL: `https://wd-notes-app.herokuapp.com`
}

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig