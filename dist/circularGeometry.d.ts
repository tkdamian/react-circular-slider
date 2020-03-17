export declare function angleToValue(params: {
    angle: number;
    minValue: number;
    maxValue: number;
    startAngle: number;
    endAngle: number;
}): number;
export declare function valueToAngle(params: {
    value: number;
    minValue: number;
    maxValue: number;
    startAngle: number;
    endAngle: number;
}): number;
export declare type AngleDescription = {
    direction: "cw" | "ccw";
    axis: "+x" | "-x" | "+y" | "-y";
};
export declare type AngleWithDescription = {
    degree: number;
} & AngleDescription;
export declare function angleToPosition(angle: AngleWithDescription, radius: number, svgSize: number): {
    x: number;
    y: number;
};
export declare function positionToAngle(position: {
    x: number;
    y: number;
}, svgSize: number, angleType: AngleDescription): number;
export declare function semiCircle(opts: {
    startAngle: number;
    endAngle: number;
    angleType: AngleDescription;
    radius: number;
    svgSize: number;
    direction: "cw" | "ccw";
}): string;
