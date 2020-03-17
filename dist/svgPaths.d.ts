import { AngleDescription } from "./circularGeometry";
export declare function pieShapedPath(opts: {
    startAngle: number;
    endAngle: number;
    angleType: AngleDescription;
    radius: number;
    svgSize: number;
    direction: "cw" | "ccw";
}): string;
export declare function arcShapedPath(opts: {
    startAngle: number;
    endAngle: number;
    angleType: AngleDescription;
    radius: number;
    svgSize: number;
    direction: "cw" | "ccw";
}): string;
export declare function arcPathWithRoundedEnds(opts: {
    startAngle: number;
    endAngle: number;
    angleType: AngleDescription;
    innerRadius: number;
    thickness: number;
    svgSize: number;
    direction: "cw" | "ccw";
}): string;
