import PropTypes from "prop-types";
import React, { Component } from "react";

import "../styles/ToggleButton.css";

export class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { selected, toggleSelected } = this.props;
        return (
            <div className="toggle-container" onClick={toggleSelected}>
                <div className={`dialog-button ${selected ? "" : "disabled"}`}>
                    {selected ? "Past" : "Upcoming"}
                </div>
            </div>
        );
    }
}

ToggleButton.propTypes = {
    selected: PropTypes.bool.isRequired,
    toggleSelected: PropTypes.func.isRequired
};
