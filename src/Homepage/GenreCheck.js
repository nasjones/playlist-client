import React, { Component } from 'react'

export default class genreChecks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
        }
    }

    toggleClick = (e) => {
        this.props.clickE(e, this.state.name)
    }

    render() {

        if (this.props.selected === this.state.name)
            return (
                <label key={this.state.id} name={this.state.name} className="genre-option gen-selected" htmlFor={this.state.id} checked={this.state.selectedGen === this.state.name}>
                    {this.state.name}

                    <input type="radio" value={this.state.name} name="gen-option" id={this.state.id} />
                </label>
            )

        else
            return (

                <label key={this.state.id} name={this.state.name} className="genre-option" htmlFor={this.state.id} checked={this.state.selectedGen === this.state.name}>
                    {this.state.name}

                    <input type="radio" value={this.state.name} name="gen-option" id={this.state.id} />
                </label>

            )

    }
}