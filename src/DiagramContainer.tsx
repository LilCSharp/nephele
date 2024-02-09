import React from "react";

const Diagram: React.FC = () => {
    return (
        <div
            id="global-board"
            className="diagram-container-wrapper"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: 'red'
            }}
        ></div>
    )
}

export default Diagram;