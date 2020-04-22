require('dotenv').config()
module.exports = {
    API_TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
    API_TOKEN_KEY: process.env.API_TOKEN_KEY,
    ENDPOINT: "http://localhost:8000/"
}