require("dotenv").config();
module.exports = {
	ENDPOINT: "http://localhost:8000/api",
	// "https://fierce-plains-16077.herokuapp.com/api",
	API_KEY:
		process.env.REACT_API_KEY || "534879e3-6fdc-4442-8f24-f619396e2724",
};
