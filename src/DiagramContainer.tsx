import React, { useState, MouseEvent } from "react";
import Rectangle from "./Rectangle";
import { RectangleProps } from "./types";
import "./Diagram.css";
import "./Rectangle.css";

interface DiagramProps {
    isCreating: boolean
    createEnd: () => void
}

const Diagram: React.FC<DiagramProps> = ({isCreating, createEnd}) => {
    const [rectangles, setRectangles] = useState<RectangleProps[]>([
        { id: 0, x: 500, y: 500, width: 100, height: 100 },
    ]);
    const [idCounter, setIdCounter] = useState<number>(1);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [activeRectangle, setActiveRectangle] = useState<number | null>(null);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);
    const [backgroundPositionX, setBackgroundPositionX] = useState<number>(0);
    const [backgroundPositionY, setBackgroundPositionY] = useState<number>(0);

    const createElementDefault = (e: MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        setRectangles([
            ...rectangles, 
            {
                id: idCounter,
                x: e.clientX - 50 - bounds.left,
                y: e.clientY - 50 - bounds.top,
                width: 100,
                height: 100
            }
        ])
        setIdCounter(idCounter + 1);
        createEnd();
    }

    const selectDiagram = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setOffsetX(e.clientX);
        setOffsetY(e.clientY);
    }

    const selectElement = (e: MouseEvent<HTMLDivElement>, id: number) => {
        e.stopPropagation();
        setIsDragging(true);
        setOffsetX(e.clientX);
        setOffsetY(e.clientY);
        setActiveRectangle(id);
    }

    const translateElement = (e: MouseEvent<HTMLDivElement>) => {
        if(!isDragging) return;

        const deltaX = e.clientX - offsetX;
        const deltaY = e.clientY - offsetY;

        if (activeRectangle === null) {
            const updatedRectangles = rectangles.map(rectangle => ({
                ...rectangle,
                x: rectangle.x + deltaX,
                y: rectangle.y + deltaY
            }));

            setRectangles(updatedRectangles);
            setBackgroundPositionX(backgroundPositionX + deltaX);
            setBackgroundPositionY(backgroundPositionY + deltaY);
        } else {
            const updatedRectangles = rectangles.map((rectangle) => {
                if (activeRectangle === rectangle.id) {
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

        setOffsetX(e.clientX);
        setOffsetY(e.clientY);
    }

    const endSelection = () => {
        setActiveRectangle(null);
        setIsDragging(false);
    }

    return (
        <div
            id="global-board"
            className="diagram-body diagram-container-wrapper"
            style={{
                backgroundPositionX: `${backgroundPositionX}px`,
                backgroundPositionY: `${backgroundPositionY}px`,
                cursor: isCreating ? `crosshair` : `default`,
            }}
            onMouseDown={ isCreating ? () => {} : selectDiagram }
            onClick={ isCreating ? createElementDefault : () => {} }
            onMouseMove={translateElement}
            onMouseUp={endSelection}
        >
            {rectangles.map((rectangle) => (
                <div
                    key={rectangle.id}
                    id={rectangle.id.toString()}
                    className="rectangle"
                    style={{ position: 'absolute', left: rectangle.x, top: rectangle.y, width: rectangle.width, height: rectangle.height, borderRadius: '8px', cursor: "grabbing" }}
                    onMouseDown={ isCreating ? () => {} : (e) => selectElement(e, rectangle.id)}
                ></div>
            ))}
        </div>
    );
}

export default Diagram;