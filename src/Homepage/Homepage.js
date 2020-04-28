import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PlaylistContext from '../PlaylistContext'
import './Homepage.css'
import GenreCheck from './GenreCheck'
import ValidationError from '../ValidationError'
import config from '../config'


export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            titleTouch: false,
            selected: [],
            genTouch: false,
            hour: null,
            hourTouch: false,
            min: null,
            minTouch: false,
        }
    }

    clickStore = (e, status) => {
        if (!status)
            this.setState({
                selected: [...this.state.selected, e.target.value],
                genTouch: true
            })
        else {
            let temp = this.state.selected.filter(item => {
                if (item !== e.target.value)
                    return item
            })
            this.setState({ selected: temp })
        }

    }

    titleChange = (e) => {
        this.setState({
            title: e.target.value,
            titleTouch: true
        })
    }

    minChange = (e) => {
        this.setState({
            min: parseInt(e.target.value),
            minTouch: true
        })
    }

    hourChange = (e) => {
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
        const genres = this.state.selected
        if (genres.length === 0)
            return "You must select at least one genre"
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
        let time = (3600 * this.state.hour) + (60 * this.state.min)
        let newPlaylist = {
            title: this.state.title.trim(),
            length: time,
            author: 1
        }

        fetch(`${config.ENDPOINT}/playlists`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPlaylist),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then((created) => {
                fetch(`${config.ENDPOINT}/`)
                // value.pageUpdate()
                this.props.history.push('/homepage')

            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {

        return (
            <PlaylistContext.Consumer>
                {(value) => {

                    let genres = value.genres.map(genre =>
                        <GenreCheck id={genre.id} name={genre.name} key={genre.id} clickE={this.clickStore} />
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
                    // let untouched = this.state.nameTouch && this.state.genTouch && this.state.hourTouch && this.state.minTouch


                    return genres && (
                        <div id="play-stage">
                            <form>
                                <div id="input-wrap">
                                    <div className="inputs">
                                        <label htmlFor="title-input">Playlist Name: </label>
                                        <input type="text" id="title-input" onChange={this.titleChange} />
                                        {this.state.titleTouch && <ValidationError message={titleError} />}
                                    </div>
                                    <div className="inputs">
                                        <label htmlFor="hour-length">Playlist length: </label>
                                        <select onChange={this.hourChange}>
                                            <option value={null}>--Hour(s)--</option>
                                            {hours}
                                        </select>
                                    :
                                    <select onChange={this.minChange}>
                                            <option value={null}>--Minute(s)--</option>
                                            {minutes}
                                        </select>
                                        {(this.state.hourTouch && this.state.minTouch) && <ValidationError message={timeError} />}
                                    </div>
                                </div>
                                <fieldset >
                                    <legend>Choose your genre(s)!</legend>
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