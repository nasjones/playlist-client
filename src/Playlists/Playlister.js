import React from 'react'
import { Link } from 'react-router-dom'
import PlaylistContext from '../PlaylistContext'
import PropTypes from 'prop-types'
import config from '../config'

export default function Playlister(props) {

    console.log(props)
    let time_convert = (length) => {
        var min = Math.floor((length / 60000) % 60)
        var hours = Math.floor((length / 3600000));
        return hours + ":" + (min < 10 ? '0' : '') + min;
    }
    let length = time_convert(props.length)

    return (

        <Link to={`/playlist-display/${props.id}`} className="list-item">
            <h2>{props.name}</h2>
            <span>{props.genre.name}</span>
            <br />
            <span>Runtime: {length}</span>
        </Link>

    )
}
