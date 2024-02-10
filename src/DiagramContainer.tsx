import React, { useState, MouseEvent } from "react";
import Rectangle from "./Rectangle";

const Diagram: React.FC = () => {
    const [rectangles, setRectangles] = useState<Rectangle[]>([new Rectangle(50, 50, 100, 100)]);
    const [selection, setSelection] = useState<number | null>(null);

    const selectBoard = () => {
        setSelection(-1);
        console.log("Board selected");
    }

    const selectElement = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        setSelection(index);
        console.log("Rect selected");
    }

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
                display: 'flex'
            }}
            onMouseDown={selectBoard}
        >
            {rectangles.map((rectangle, index) => (
                <React.Fragment key={index}>{rectangle.getRectangleComponent(index, selectElement)}</React.Fragment>
            ))}
        </div>
    )
}

export default Diagram;