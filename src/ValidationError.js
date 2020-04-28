import React from 'react';

export default function ValidationError(props) {
    if (props.message) {
        console.log(props.message)
        return (
            <div className="error">{props.message}</div>
        );
    }

    return <></>
}