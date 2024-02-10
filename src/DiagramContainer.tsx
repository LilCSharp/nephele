import React, { useState, MouseEvent } from "react";
import Rectangle from "./Rectangle";

const Diagram: React.FC = () => {
    const [rectangles, setRectangles] = useState<Rectangle[]>([new Rectangle(50, 50, 100, 100), new Rectangle(200, 200, 100, 100)]);
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

    const translateElement = (e: MouseEvent<HTMLDivElement>) => {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        if (selection === -1) {
            const updatedRectangles = rectangles.map(rectangle => {
                return new Rectangle(
                    rectangle.x + deltaX,
                    rectangle.y + deltaY,
                    rectangle.width,
                    rectangle.height
                );
            });

            setRectangles(updatedRectangles);
        } else if (selection != null) {
            const updatedRectangles = rectangles.map((rectangle, index) => {
                if (selection === index) {
                    return new Rectangle(
                        rectangle.x + deltaX,
                        rectangle.y + deltaY,
                        rectangle.width,
                        rectangle.height
                    )
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
            onMouseMove={translateElement}
            onMouseUp={endSelection}
        >
            {rectangles.map((rectangle, index) => (
                <React.Fragment key={index}>{rectangle.getRectangleComponent(index, selectElement)}</React.Fragment>
            ))}
        </div>
    )
}

export default Diagram;