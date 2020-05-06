require('dotenv').config()
console.log(process.env)
module.exports = {
    ENDPOINT: "http://localhost:8000/api",
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY
}