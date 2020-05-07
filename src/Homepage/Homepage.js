import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlaylistContext from '../PlaylistContext'
import './Homepage.css'
import GenreCheck from './GenreCheck'
import ValidationError from '../ValidationError'
import config from '../config'


export default class HomePage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            titleTouch: false,
            selectedId: null,
            selectedGen: null,
            genTouch: false,
            hour: null,
            hourTouch: false,
            min: null,
            minTouch: false,
        }
    }

    fieldChange = e => {

        this.setState({
            selectedId: e.target.id,
            selectedGen: e.target.value
        })
    }

    titleChange = e => {
        this.setState({
            title: e.target.value,
            titleTouch: true
        })
    }

    minChange = e => {
        this.setState({
            min: parseInt(e.target.value),
            minTouch: true
        })
    }

    hourChange = e => {
        this.setState({
            hour: parseInt(e.target.value),
            hourTouch: true
        })
    }

    minArr = () => {
        let arr = new Array(60);
        for (let i = 0; i <= 59; i++)
            arr[i] = i

        return arr
    }

    hourArr = () => {
        let arr = new Array(4);
        for (let i = 0; i <= 2; i++)
            arr[i] = i
        return arr
    }

    validateTime = () => {
        const hourSelect = this.state.hour
        const minSelect = this.state.min
        if ((hourSelect === null) || (minSelect === null) || isNaN(hourSelect) || isNaN(minSelect) || (hourSelect === 0 && minSelect === 0))
            return "Select a valid time"
    }

    validateGenre = () => {
        const genre = this.state.selectedId
        if (genre === null)
            return "You must select a genre."
    }

    validateTitle = () => {
        const titleInput = this.state.title.trim()
        if (titleInput.length === 0) {
            return "Title is required."
        } else if (titleInput.length < 3) {
            return "Title must be atleast 3 characters long."
        }
    }

    subHandle = (e, value) => {
        e.preventDefault();
        let time = (3600000 * this.state.hour) + (60000 * this.state.min)
        let newPlaylist = {
            title: this.state.title.trim(),
            length: time,
            genre_id: this.state.selectedId,
            author: 1
        }


        fetch(`${config.ENDPOINT}/playlists`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
            },
            body: JSON.stringify(newPlaylist),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(res => {

                value.pageUpdate()
                this.props.history.push(`/playlist-display/${res.id}`,
                    {
                        genres: value.genres,
                        time: time
                    }
                )
            })
            .catch(error => {
                console.error({ error })
            })
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        return (
            <PlaylistContext.Consumer>
                {(value) => {

                    let genres = value.genres.map(genre =>
                        <GenreCheck id={genre.id} name={genre.name} selected={this.state.selectedGen} key={genre.id} />
                    )

                    let minutes = this.minArr().map(min => {
                        if (min < 10)
                            return <option value={min} key={min}>0{min}</option>
                        else
                            return <option value={min} key={min}>{min}</option>
                    })

                    let hours = this.hourArr().map(min => {
                        return <option value={min} key={min}>{min}</option>
                    })

                    const timeError = this.validateTime()
                    const genreError = this.validateGenre()
                    const titleError = this.validateTitle()

                    return genres && (
                        <div id="play-stage">
                            <form>
                                <div id="input-wrap">
                                    <div className="inputs">
                                        <label htmlFor="title-input">Playlist Name: </label>
                                        <input type="text" id="title-input" onChange={this.titleChange} className="user-inputs" />
                                        {this.state.titleTouch && <ValidationError message={titleError} />}
                                    </div>
                                    <div className="inputs">
                                        <label htmlFor="hour-length">Playlist length: </label>
                                        <select onChange={this.hourChange} className="user-inputs">
                                            <option value={null}>--Hour(s)--</option>
                                            {hours}
                                        </select>
                                    :
                                    <select onChange={this.minChange} className="user-inputs">
                                            <option value={null}>--Minute(s)--</option>
                                            {minutes}
                                        </select>
                                        {(this.state.hourTouch && this.state.minTouch) && <ValidationError message={timeError} />}
                                    </div>
                                </div>
                                <fieldset onChange={this.fieldChange}>
                                    <legend>Choose your genre!</legend>
                                    {(this.state.genTouch && <ValidationError message={genreError} />)}
                                    <div id="genres">
                                        {genres}
                                    </div>
                                </fieldset>
                                <button type="submit" id="create" onClick={e => this.subHandle(e, value)} disabled={timeError || genreError || titleError}>Create your playlist!</button>
                            </form>
                        </div>
                    )
                }
                }
            </PlaylistContext.Consumer >

        )
    }
}