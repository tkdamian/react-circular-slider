"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circularGeometry_1 = require("./circularGeometry");
function getStartAndEndPosition(opts) {
    const { startAngle, endAngle, radius, svgSize, angleType } = opts;
    let isCircle = false;
    if (startAngle !== endAngle && startAngle % 360 === endAngle % 360) {
        isCircle = true;
    }
    const startPosition = circularGeometry_1.angleToPosition(Object.assign({ degree: startAngle }, angleType), radius, svgSize);
    const endPosition = circularGeometry_1.angleToPosition(Object.assign({ degree: isCircle ? endAngle - 0.001 : endAngle }, angleType), radius, svgSize);
    return { startPosition, endPosition, isCircle };
}
function pieShapedPath(opts) {
    const { radius, svgSize, direction } = opts;
    const { startPosition, endPosition } = getStartAndEndPosition(opts);
    return `
    M ${svgSize / 2},${svgSize / 2}
    L ${startPosition.x},${startPosition.y}
    A ${radius} ${radius} 0 ${direction === "cw" ? "1 1" : "0 0"}
      ${endPosition.x} ${endPosition.y}
    Z
  `;
}
exports.pieShapedPath = pieShapedPath;
function arcShapedPath(opts) {
    const { startAngle, endAngle, radius, direction } = opts;
    const { startPosition, endPosition, isCircle } = getStartAndEndPosition(opts);
    const largeArc = endAngle - startAngle >= 180;
    return `
      M ${startPosition.x},${startPosition.y}
      A ${radius} ${radius} 0
        ${largeArc ? "1" : "0"}
        ${direction === "cw" ? "1" : "0"}
        ${endPosition.x} ${endPosition.y}
        ${isCircle ? "Z" : ""}
    `;
}
exports.arcShapedPath = arcShapedPath;
function arcPathWithRoundedEnds(opts) {
    const { startAngle, innerRadius, thickness, direction, angleType, svgSize } = opts;
    let { endAngle } = opts;
    if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
        endAngle = endAngle - 0.001;
    }
    const largeArc = endAngle - startAngle >= 180;
    const outerRadius = innerRadius + thickness;
    const innerArcStart = circularGeometry_1.angleToPosition(Object.assign({ degree: startAngle }, angleType), innerRadius, svgSize);
    const startPoint = `
    M ${innerArcStart.x},${innerArcStart.y}
  `;
    const innerArcEnd = circularGeometry_1.angleToPosition(Object.assign({ degree: endAngle }, angleType), innerRadius, svgSize);
    const innerArc = `
    A ${innerRadius} ${innerRadius} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "1" : "0"}
      ${innerArcEnd.x} ${innerArcEnd.y}
  `;
    const outerArcStart = circularGeometry_1.angleToPosition(Object.assign({ degree: endAngle }, angleType), outerRadius, svgSize);
    const firstButt = `
    A ${thickness / 2} ${thickness / 2} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${outerArcStart.x} ${outerArcStart.y}
  `;
    const outerArcEnd = circularGeometry_1.angleToPosition(Object.assign({ degree: startAngle }, angleType), outerRadius, svgSize);
    const outerArc = `
    A ${outerRadius} ${outerRadius} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${outerArcEnd.x} ${outerArcEnd.y}
  `;
    const secondButt = `
    A ${thickness / 2} ${thickness / 2} 0
      ${largeArc ? "1" : "0"}
      ${direction === "cw" ? "0" : "1"}
      ${innerArcStart.x} ${innerArcStart.y}
  `;
    return startPoint + innerArc + firstButt + outerArc + secondButt + " Z";
}
exports.arcPathWithRoundedEnds = arcPathWithRoundedEnds;
