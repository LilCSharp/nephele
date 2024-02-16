import { MouseEvent } from "react";

export interface RectangleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
    movementCallback: (e: MouseEvent<HTMLDivElement>, index: number) => void;
}
