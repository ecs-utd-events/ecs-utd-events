import React from "react";

import "../styles/ToggleButton.css";

export default function ToggleButton({ selected, toggleSelected, ...otherProps }) {

    return (
        <div className={`toggle-container ${selected ? "selected" : "unselected"}`} onClick={toggleSelected} {...otherProps}>
            <div className={`dialog-button ${selected ? "selected" : "unselected"}`}>
                {selected ? "Upcoming" : "Past"}
            </div>
        </div>
    )
}
