import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'


export default class Landing extends Component {

    render() {
        return (
            <div id="user-prompt">
                <h2>Welcome to playlist maker</h2>
                <p>Looking to discover new music? Tired of your old study playlist? This app is for you just choose the genres and input the amount of time you would like the playlist to run and wait for your new playlist to be created.</p>
                <Link to={'/homepage'}>Create a Playlist!</Link>
                <Link to={'/existing-playlists'}>See existing playlists</Link>
            </div>
        )
    }
}