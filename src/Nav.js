import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import PlaylistContext from './PlaylistContext'

export default class Nav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hidden: true
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    output = (value) => {
        if (this.props.clicker) {
            if (value.playlists.length > 5) {
                return value.playlists.slice(value.playlists.length - 6, value.playlists.length - 1).map(playlist => {
                    let genre = value.genres.find(genre => {
                        return genre.id === playlist.genre_id
                    })

                    return genre && (
                        <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} onClick={this.props.clicker} >
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
                        <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} onClick={e => { this.props.clicker(playlist.id) }} >
                            <article className="navLink">
                                <h3 id={playlist.id} >{playlist.title}</h3>
                                <span>Genre: {genre.name}</span>
                            </article>
                        </Link>
                    )
                })
        }
        else {
            if (value.playlists.length > 5) {
                return value.playlists.slice(value.playlists.length - 6, value.playlists.length - 1).map(playlist => {
                    let genre = value.genres.find(genre => {
                        return genre.id === playlist.genre_id
                    })

                    return genre && (
                        <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} >
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
                        <Link key={playlist.id} to={`/playlist-display/${playlist.id}`} >
                            <article className="navLink">
                                <h3 id={playlist.id} >{playlist.title}</h3>
                                <span>Genre: {genre.name}</span>
                            </article>
                        </Link>
                    )
                })
        }

    };

    resize() {
        let display = (window.innerWidth >= 850);
        if (display) {
            this.setState({ hidden: false });
        }
        else {
            this.setState({ hidden: true });
        }

    }

    render() {
        return (
            <PlaylistContext.Consumer>
                {(value) => {
                    let playlistOut = this.output(value)
                    if (!this.state.hidden || window.innerWidth >= 850) {

                        return playlistOut && (

                            <div id="navWrap">
                                <input type="image" id="ham" src={require('./cross.png')} alt="ham-icon" onClick={e => {
                                    this.setState({
                                        hidden: !this.state.hidden
                                    })
                                }} />
                                <div id="navBar">

                                    <h2 id="recent">Most Recent</h2>
                                    {playlistOut}
                                    <Link to={'/existing-playlists'}>
                                        <article className="navLink">
                                            <h3>See More!</h3>
                                        </article>
                                    </Link>
                                    <Link to={'/homepage'}  >
                                        <article className="navLink">
                                            <h3>Create a playlist</h3>
                                        </article>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div id="navWrap">
                                <input type="image" id="ham" src={require('./Ham.png')} alt="ham-icon" onClick={e => {
                                    this.setState({
                                        hidden: !this.state.hidden
                                    })
                                }} />
                            </div>
                        )
                    }

                }
                }
            </PlaylistContext.Consumer>

        )
    }
}
