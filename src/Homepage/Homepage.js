import React, { Component } from 'react'
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
            selectedId: null,
            selectedGen: null,
            genTouch: false,
            hour: NaN,
            timeTouch: false,
            min: NaN,
            windowHeight: 0,
            scrollErr: false
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
            timeTouch: true
        })
    }

    hourChange = e => {
        this.setState({
            hour: parseInt(e.target.value),
            timeTouch: true
        })
    }

    minArr = () => {
        let arr = new Array(60);
        for (let i = 0; i <= 59; i++)
            arr[i] = i
        return arr
    }

    hourArr = () => {
        let arr = new Array(2);
        for (let i = 0; i <= 2; i++)
            arr[i] = i
        return arr
    }

    validateTime = () => {
        const hourSelect = this.state.hour
        const minSelect = this.state.min
        if ((isNaN(hourSelect) && isNaN(minSelect)) || (isNaN(hourSelect) && (minSelect === 0)) || (isNaN(minSelect) && (hourSelect === 0)) || ((minSelect === 0) && (hourSelect === 0)))
            return "Select a valid time."
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
        let time = (3600000 * (this.state.hour) || 0) + (60000 * (this.state.min || 0))
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

    goLand = (e) => {
        e.preventDefault()
        this.props.history.push('/')
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e) => {
        this.setState({
            windowHeight: window.pageYOffset
        });
        this.errActivate()
    }

    errActivate = () => {
        if (window.innerWidth < 450) {
            if (this.state.windowHeight >= (window.innerHeight / 3)) {
                this.setState({
                    titleTouch: true,
                    timeTouch: true,
                    genTouch: true
                })
            }
        }
        else
            if (this.state.windowHeight >= (window.innerHeight / 2)) {
                this.setState({
                    titleTouch: true,
                    timeTouch: true,
                    genTouch: true
                })
            }
    }

    render() {
        return (
            <PlaylistContext.Consumer>
                {(value) => {
                    let genres = value.genres.map(genre =>
                        <GenreCheck id={genre.id} name={genre.name} selected={this.state.selectedGen} key={genre.id} />
                    )

                    if (genres.length === 0)
                        return (<h1 className="loading">Loading</h1>)

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
                                            <option value={null}>Hr(s)</option>
                                            {hours}
                                        </select>
                                    :
                                    <select onChange={this.minChange} className="user-inputs">
                                            <option value={null}>Min(s)</option>
                                            {minutes}
                                        </select>
                                        {this.state.timeTouch && <ValidationError message={timeError} />}
                                    </div>
                                </div>
                                <fieldset onChange={this.fieldChange}>
                                    <legend>Choose your genre!</legend>
                                    {(this.state.genTouch && <ValidationError message={genreError} />)}
                                    <div id="genres">
                                        {genres}
                                    </div>
                                </fieldset>
                                <div id="button-wrap">
                                    <button type="submit" id="create" onClick={e => this.subHandle(e, value)} disabled={timeError || genreError || titleError}>Create your playlist!</button>
                                    <button id="create" onClick={e => this.goLand(e)}>Return Home</button>
                                </div>
                            </form>
                        </div>
                    )
                }
                }
            </PlaylistContext.Consumer >

        )
    }
}