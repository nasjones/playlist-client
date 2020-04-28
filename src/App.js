import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import config from './config';
import PlaylistContext from './PlaylistContext'
import Landing from './Landingpage/Landing'
import Homepage from './Homepage/Homepage'
import test_genres from './test-genres'

class App extends Component {
  state = {
    genres: [],
    playlists: [],
    user: null,
    error: null,
  }

  setGenres = genres => {
    this.setState({
      genres,
      user: this.state.user,
      error: this.state.error,
    })
  }

  setPlaylists = playlists => {
    this.setState({
      playlists,
      user: this.state.user,
      error: this.state.error,
    })
  }

  componentDidMount() {
    // let endpoint = config.ENDPOINT
    // Promise.all([
    //   fetch(endpoint + '/playlists'),
    //   fetch(endpoint + '/genres')
    // ],
    //   {
    //     method: 'GET',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   })
    //   .then(([playlistRes, genreRes]) => {
    //     if (!playlistRes.ok)
    //       return playlistRes.json().then(error => Promise.reject(error))
    //     if (!genreRes.ok)
    //       return genreRes.json().then(error => Promise.reject(error))
    //     return Promise.all([playlistRes, genreRes.json()])
    //   })
    //   .then(([playlist, genres]) => {
    //     this.setPlaylists(playlist)
    //     this.setGenres(genres)
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //     this.setState({ error })
    //   });
    this.setState({
      genres: test_genres
    })
  }

  pageUpdate = () => {
    this.componentDidUpdate()
  }

  render() {
    const contextValue = {
      genres: this.state.genres,
      playlists: this.state.playlists,
      pageUpdate: this.pageUpdate
    }

    return (
      <div className="App" >
        <header className="App-header">
          <Link to={'/'} id="home-link">
            <h1>ShowTunes</h1>
          </Link>
          <hr />
        </header>
        <PlaylistContext.Provider value={contextValue}>
          <main id="stage">
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/homepage' component={Homepage} />
              <Route path='/existing-playlists' component={Homepage} />
            </Switch>

          </main>
        </PlaylistContext.Provider>
      </div>
    );
  }
}

export default App;
