import React, { CSSProperties, MouseEvent } from "react";
import "./Rectangle.css";
import { RectangleProps } from "./types";

class Rectangle extends React.Component<RectangleProps> {
    constructor(props: RectangleProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { id ,x, y, width, height } = this.props;

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
            <div className="rectangle" style={style}></div>
        )
    }
}

export default React.memo(Rectangle);