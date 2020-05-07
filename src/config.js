require('dotenv').config()
console.log(process.env)
module.exports = {
    ENDPOINT: "https://young-meadow-35827.herokuapp.com/api",
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY
}