import React, { Component } from 'react';
import Playlister from './Playlister'
import PlaylistContext from '../PlaylistContext'
import './Existing-playlists.css'
import Nav from '../Nav'


export default class ExistingPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            genreId: "All",
        }
    }

    lister = (value) => {
        let temp
        if (this.state.genreId === "All") {
            temp = value.playlists.map(playlist => {
                if (playlist) {
                    let genre = value.genres.find(genre => {
                        return genre.id === playlist.genre_id
                    })
                    return genre && (
                        <Playlister key={playlist.id} id={playlist.id} name={playlist.title} genre={genre} length={playlist.length} />
                    )
                }
                return undefined
            })
        }
        else {
            temp = value.playlists.map(playlist => {
                if (playlist) {
                    let genre = value.genres.find(genre => {
                        return genre.id === playlist.genre_id
                    })
                    if (this.state.genreId === playlist.genre_id.toString())
                        return genre && (
                            <Playlister key={playlist.id} id={playlist.id} name={playlist.title} genre={genre} length={playlist.length} />
                        )
                }
                return null
            })
        }
        return temp.filter(item => item !== null)
    }

    genChange = (id) => {
        this.setState({
            genreId: id
        })
    }

    render() {
        return (
            <PlaylistContext.Consumer>
                {(value) => {
                    let output = this.lister(value)
                    let select = value.genres.map(genre => {
                        return <option id={genre.id} key={genre.id} value={genre.id}>{genre.name}</option>
                    })

                    if (!value.loaded) return <h1 className="loading">Loading..</h1>;

                    if ((output.length === 0) && (this.state.genreId === "All")) return (<div className="error">Sorry no playlists at the moment! <a href="/homepage">Create one.</a></div>)

                    if ((output.length === 0) && (this.state.genreId !== "All"))
                        return (
                            <div id="existing-display">
                                <Nav />
                                <div id="lister">
                                    <label htmlFor="genSelect">Genre Filter: </label>
                                    <select onChange={e => this.genChange(e.target.value)} id="genSelect">
                                        <option value={null}>All</option>
                                        {select}
                                    </select>
                                    <h2>Sorry no playlists of this genre are currently available <a href='/homepage'>Create one</a> or select a different genre.</h2>
                                </div>
                            </div>
                        )

                    return (
                        <div id="existing-display">
                            <Nav />
                            <div id="lister">
                                <label htmlFor="genSelect">Genre Filter: </label>
                                <select onChange={e => this.genChange(e.target.value)} id="genSelect">
                                    <option value={null}>All</option>
                                    {select}
                                </select>
                                <div id="play-listed">
                                    {output}
                                </div>
                            </div>
                        </div>
                    )
                }
                }
            </PlaylistContext.Consumer>


        )
    }
}