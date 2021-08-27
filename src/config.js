require('dotenv').config()
module.exports = {
    ENDPOINT: "http://localhost:8000/api",
    // ENDPOINT: "https://fierce-plains-16077.herokuapp.com/api",
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY
}