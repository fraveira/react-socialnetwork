// src/cute-animals.js
import React from "react";
import axios from "axios";

export default class CuteAnimals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Perica"
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // axios.get('/some-route').then(({ data }) => {

        // });
        setTimeout(() => {
            this.setState({
                name: "pete"
            });
        }, 1000);
    }

    handleClick() {
        this.setState({
            name: "David"
        });
    }

    render() {
        return (
            <div>
                <h1>Cute animals</h1>
                <p onClick={() => this.handleClick()}>{this.state.name}</p>
                <p>{this.props.cuteAnimal} </p>
            </div>
        );
    }
}
