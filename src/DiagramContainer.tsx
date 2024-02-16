import React, { useState, MouseEvent } from "react";
import Rectangle from "./Rectangle";
import { RectangleProps } from "./types";
import "./Diagram.css";

const Diagram: React.FC = () => {
    const [selection, setSelection] = useState<number | null>(null);
    const [initialX, setInitialX] = useState<number>(0);
    const [initialY, setInitialY] = useState<number>(0);

    const selectBoard = () => {
        setSelection(-1);
        console.log("Board selected");
    }

    const selectElement = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        setSelection(index);
        console.log("Rect selected");
    }

    const [rectangles, setRectangles] = useState<RectangleProps[]>([
        { x: 50, y: 50, width: 100, height: 100, index: 0, movementCallback: selectElement },
        { x: 200, y: 200, width: 100, height: 100, index: 1, movementCallback: selectElement }
    ]);

    const translateElement = (e: MouseEvent<HTMLDivElement>) => {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        if (selection === -1) {
            const updatedRectangles = rectangles.map(rectangle => ({
                ...rectangle,
                x: rectangle.x + deltaX,
                y: rectangle.y + deltaY
            }));

            setRectangles(updatedRectangles);
        } else if (selection != null) {
            const updatedRectangles = rectangles.map((rectangle, index) => {
                if (selection === index) {
                    return {
                        ...rectangle,
                        x: rectangle.x + deltaX,
                        y: rectangle.y + deltaY
                    };
                }

                return rectangle;
            });

            setRectangles(updatedRectangles);
        }

        setInitialX(e.clientX);
        setInitialY(e.clientY);
    }

    const endSelection = () => {
        setSelection(null);
    }

    return (
        <div
            id="global-board"
            className="diagram-body diagram-container-wrapper"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex'
            }}
            onMouseDown={selectBoard}
            onMouseMove={translateElement}
            onMouseUp={endSelection}
        >
            {rectangles.map((rectangle, index) => (
                <React.Fragment key={index}>
                    <Rectangle {...rectangle} />
                </React.Fragment>
            ))}
        </div>
    );
}

export default Diagram;