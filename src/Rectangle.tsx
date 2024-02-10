import React, { CSSProperties, MouseEvent } from "react";
import "./Rectangle.css";

class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getRectangleComponent(index: number, movementCallback: (e: MouseEvent<HTMLDivElement> ,n: number) => void): React.ReactElement {
        const style: CSSProperties = {
            position: 'absolute',
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            borderRadius: '8px',
            cursor: "grabbing"
        };

        return <div className="rectangle" style={style} onMouseDown={(e: MouseEvent<HTMLDivElement>) => movementCallback(e, index)}></div>
    }
}

export default Rectangle;