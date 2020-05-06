import React from 'react'
import './Song.css'
import { Link } from 'react-router-dom'
import PlaylistContext from '../PlaylistContext'
import PropTypes from 'prop-types'
import config from '../config'

export default function Song(props) {


    let msConverter = (length) => {
        var min = Math.floor(length / 60000);
        var sec = ((length % 60000) / 1000).toFixed(0);
        return min + ":" + (sec < 10 ? '0' : '') + sec;
    }

    let timeOut = msConverter(props.track.length)
    let artistOut = props.track.artist.join(', ')
    return (

        <a target='_blank' href={props.track.url}>
            <div className="song-item">
                <h3>{props.track.title}</h3>
                <span className="artist">by: {artistOut}</span>
                <span id="time">{timeOut}</span>
                <hr />
            </div>
        </a>
    )
}

