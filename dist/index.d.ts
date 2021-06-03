import * as React from "react";
import { AngleDescription } from "./circularGeometry";
declare type Props = {
    size: number;
    minValue: number;
    maxValue: number;
    startAngle: number;
    endAngle: number;
    angleType: AngleDescription;
    handleSize: number;
    handle1: {
        value: number;
        onChange?: (value: number, ev: React.TouchEvent<SVGSVGElement> | TouchEvent | React.MouseEvent<SVGSVGElement> | MouseEvent) => void;
    };
    handle2?: {
        value: number;
        onChange: (value: number, ev: React.TouchEvent<SVGSVGElement> | TouchEvent | React.MouseEvent<SVGSVGElement> | MouseEvent) => void;
    };
    onControlFinished?: () => void;
    disabled?: boolean;
    arcColor: string;
    arcBackgroundColor: string;
    coerceToInt?: boolean;
    outerShadow?: boolean;
    trackWidth: number;
};
export declare class CircularSlider extends React.Component<Props> {
    static defaultProps: Pick<Props, "size" | "minValue" | "maxValue" | "startAngle" | "endAngle" | "angleType" | "arcBackgroundColor" | "handleSize" | "trackWidth">;
    svgRef: React.RefObject<SVGSVGElement>;
    onMouseEnter: (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onMouseDown: (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    removeMouseListeners: () => void;
    onTouchStart: (ev: React.TouchEvent<SVGSVGElement>) => void;
    removeTouchListeners: () => void;
    processSelection: (ev: MouseEvent | React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    processSelectionTouch: (ev: TouchEvent | React.TouchEvent<SVGSVGElement>) => void;
    render(): JSX.Element;
}
export declare class CircularSliderWithChildren extends React.Component<Props> {
    static defaultProps: Pick<Props, "minValue" | "maxValue" | "startAngle" | "endAngle" | "angleType" | "size" | "arcBackgroundColor" | "handleSize" | "trackWidth">;
    render(): JSX.Element;
}
export default CircularSlider;
