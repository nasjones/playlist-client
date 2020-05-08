import React from 'react'
import './Song.css'


export default function Song(props) {


    let msConverter = (length) => {
        var min = Math.floor(length / 60000);
        var sec = ((length % 60000) / 1000).toFixed(0);
        return min + ":" + (sec < 10 ? '0' : '') + sec;
    }

    let timeOut = msConverter(props.track.length)
    let artistOut = props.track.artist.join(', ')
    return (

        <a target='_blank' href={props.track.url} rel="noopener noreferrer">
            <div className="song-item">
                <h3>{props.track.title}</h3>
                <span className="artist">by: {artistOut}</span>
                <span id="time">{timeOut}</span>
                <hr />
            </div>
        </a>
    )
}

