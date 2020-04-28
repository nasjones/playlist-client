import React, { Component } from 'react'

export default class genreChecks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            checked: false
        }
        this.myRef = React.createRef();
    }

    toggleClick = (e) => {
        this.props.clickE(e, this.state.checked)
        this.setState({
            id: this.state.id,
            name: this.state.name,
            checked: !this.state.checked
        })
    }
    render() {
        return (
            <label key={this.state.id} className={this.state.checked ? "genre-option checked" : "genre-option"} ref={this.myRef}>
                <input type="checkbox" value={this.state.name} onClick={this.toggleClick} />
                <span className="option-text">{this.state.name}</span>
            </label>
        )

    }
}