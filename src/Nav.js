import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
// import PropTypes from 'prop-types'
import PlaylistContext from './PlaylistContext'
// import PlaylistDisplay from './Playlists/Playlist-Display'

export default function Nav(props) {


    let output = (value) => {

        if (value.playlists.length > 10) {
            return value.playlists.slice(value.playlists.length - 11, value.playlists.length - 1).map(playlist => {
                let genre = value.genres.find(genre => {
                    return genre.id === playlist.genre_id
                })

                return genre && (
                    <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} onClick={props.clicker} >
                        <article className="navLink">
                            <h3 id={playlist.id} >{playlist.title}</h3>
                            <span>Genre: {genre.name}</span>
                        </article>
                    </Link>
                )
            })
        }
        else
            return value.playlists.map(playlist => {
                let genre = value.genres.find(genre => {
                    return genre.id === playlist.genre_id
                })

                return genre && (
                    <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} onClick={props.clicker} >
                        <article className="navLink">
                            <h3 id={playlist.id} >{playlist.title}</h3>
                            <span>Genre:{genre.name}</span>
                        </article>
                    </Link>
                )
            })
    };


    return (
        <PlaylistContext.Consumer>
            {(value) => {
                let playlistOut = output(value)
                return playlistOut && (
                    <div id="navBar">
                        <h2 id="recent">Most Recent</h2>
                        {playlistOut}
                        <Link to={'/existing-playlists'}>
                            <article className="navLink">
                                <h3>See More!</h3>
                            </article>
                        </Link>
                    </div>
                )

            }
            }
        </PlaylistContext.Consumer>

    )
}
