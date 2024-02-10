import React, { CSSProperties } from "react";

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

    getRectangleComponent(): React.ReactElement {
        const style: CSSProperties = {
            position: 'absolute',
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            borderRadius: '8px',
            background: 'blue',
        };

        return <div style={style}></div>
    }
}

export default Rectangle;