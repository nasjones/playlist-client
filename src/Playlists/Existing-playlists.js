import React, { Component } from 'react';
import Playlister from './Playlister'
import PlaylistContext from '../PlaylistContext'
import './Existing-playlists.css'


export default class ExistingPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
        }
    }

    lister = (value) => {
        return value.playlists.map(playlist => {
            if (playlist) {
                let genre = value.genres.find(genre => {
                    return genre.id === playlist.genre_id
                })
                return genre && (
                    <Playlister key={playlist.id} id={playlist.id} name={playlist.title} genre={genre} length={playlist.length} />
                )
            }
            return null

        })
    }

    render() {
        return (
            <PlaylistContext.Consumer>
                {(value) => {
                    let output = this.lister(value)
                    if (output.length === 0) return (<div className="error">Sorry no playlists at the moment! <a href="/homepage">Create one</a></div>)
                    return (
                        <div id="play-listed">
                            {output}

                        </div>
                    )
                }
                }
            </PlaylistContext.Consumer>


        )
    }
}