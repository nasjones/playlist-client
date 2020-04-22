import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import config from './config';

class App extends Component {
  state = {
    genres: [],
    error: null,
  }

  setGenres = genres => {
    this.setState({
      genres,
      error: null,
    })
  }

  componentDidMount() {
    fetch(config.ENDPOINT,
      {
        method: 'GET',
        mode: "cors",
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));


        return res.json();
      })
      .then((apiKey) => {
        console.log(apiKey)

      })
      .catch(error => {
        console.error({ error });
      });
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
