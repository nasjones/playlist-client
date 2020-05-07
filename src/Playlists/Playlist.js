import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlaylistContext from '../PlaylistContext'
import PropTypes from 'prop-types'
import config from '../config'
import Song from './Song'
import Nav from '../Nav'
import { render } from '@testing-library/react'

export default class Playlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlistId: this.props.id,
            playlist: null,
            songs: [],

        }

    }


    setPlaylist = (playlist) => {
        this.setState({ playlist })
    }

    addSongs = (song) => {
        this.setState({
            songs: [...this.state.songs, song]
        })
    }

    fetcher = () => {
        fetch(config.ENDPOINT + `/playlists/${this.state.playlistId}`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                }
            })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(playlist => {

                this.setPlaylist(playlist)

                fetch(config.ENDPOINT + `/genres/${playlist.genre_id}`,
                    {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                        }
                    })
                    .then(res2 => {
                        if (!res2.ok)
                            return res2.json().then(e => Promise.reject(e))
                        return res2.json()
                    })
                    .then(genre => {

                        let rand = Math.floor(Math.random() * 1950);
                        let queryString = 'genre:%20' + genre.name + '&type=track&limit=50&offset=' + rand

                        let fetData = {
                            qString: queryString,
                        }

                        fetch(`${config.ENDPOINT}/data`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                            },
                            body: JSON.stringify(fetData),
                        })
                            .then(res3 => {
                                if (!res3.ok)
                                    return res3.json().then(e => Promise.reject(e))
                                return res3.json()
                            }).then(response => {

                                let runtime = 0
                                let chosen = []

                                while (runtime < playlist.length) {

                                    let trackChoice = Math.floor(Math.random() * 50);

                                    if (!chosen.includes(trackChoice)) {
                                        chosen.push(trackChoice)
                                        let artists = []
                                        for (let i = 0; i < response.tracks.items[trackChoice].artists.length; i++)
                                            artists.push(response.tracks.items[trackChoice].artists[i].name)

                                        let song = {
                                            id: response.tracks.items[trackChoice].id,
                                            url: response.tracks.items[trackChoice].external_urls.spotify,
                                            title: response.tracks.items[trackChoice].name,
                                            length: response.tracks.items[trackChoice].duration_ms,
                                            explicit: response.tracks.items[trackChoice].explicit,
                                            artist: artists
                                        }
                                        runtime += song.length
                                        this.addSongs(song)

                                    }

                                }


                            }).catch(error3 => {
                                console.error({ error3 })
                            })

                    }).catch(error2 => {
                        console.error({ error2 });
                    });

            })
            .catch(error => {
                console.error({ error });
            });
    }

    componentDidMount() {

        this._isMounted = true;
        if (this._isMounted) {
            this.fetcher()
        }
    }

    render() {
        if (this.state.playlist === null) return <h1>Loading..</h1>;

        let songDisplay = this.state.songs.map(song => {
            return <Song track={song} key={song.id} />
        })
        return (
            <div id="playlistContent">

                <h2 id="playlist-title">{this.state.playlist.title}</h2>
                {songDisplay}
            </div>


        )
    }
}
