import React, { useState } from "react";
import Rectangle from "./Rectangle";

const Diagram: React.FC = () => {
    const [rectangles, setRectangles] = useState<Rectangle[]>([new Rectangle(50, 50, 100, 100)])

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
        >
            {rectangles.map((rectangle) => (
                <React.Fragment>{rectangle.getRectangleComponent()}</React.Fragment>
            ))}
        </div>
    )
}

export default Diagram;