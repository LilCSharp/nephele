import React, { CSSProperties, MouseEvent } from "react";
import "./Rectangle.css";
import { RectangleProps } from "./types";

class Rectangle extends React.Component<RectangleProps> {
    constructor(props: RectangleProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { x, y, width, height, index, movementCallback } = this.props;

        const style: CSSProperties = {
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            borderRadius: '8px',
            cursor: "grabbing"
        };

        return (
            <div className="rectangle" style={style} onMouseDown={(e: MouseEvent<HTMLDivElement>) => movementCallback(e, index)}></div>
        )
    }
}

export default React.memo(Rectangle);