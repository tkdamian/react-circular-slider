"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const circularGeometry_1 = require("./circularGeometry");
const svgPaths_1 = require("./svgPaths");
class CircularSlider extends React.Component {
    constructor() {
        super(...arguments);
        this.svgRef = React.createRef();
        this.onMouseEnter = (ev) => {
            if (ev.buttons === 1) {
                this.onMouseDown(ev);
            }
        };
        this.onMouseDown = (ev) => {
            const svgRef = this.svgRef.current;
            if (svgRef) {
                svgRef.addEventListener("mousemove", this.processSelection);
                svgRef.addEventListener("mouseleave", this.removeMouseListeners);
                svgRef.addEventListener("mouseup", this.removeMouseListeners);
            }
            this.processSelection(ev);
        };
        this.removeMouseListeners = () => {
            const svgRef = this.svgRef.current;
            if (svgRef) {
                svgRef.removeEventListener("mousemove", this.processSelection);
                svgRef.removeEventListener("mouseleave", this.removeMouseListeners);
                svgRef.removeEventListener("mouseup", this.removeMouseListeners);
            }
            if (this.props.onControlFinished) {
                this.props.onControlFinished();
            }
        };
        this.onTouchStart = (ev) => {
            const svgRef = this.svgRef.current;
            if (svgRef) {
                svgRef.addEventListener("touchmove", this.processSelectionTouch);
                svgRef.addEventListener("touchend", this.removeTouchListeners);
            }
            this.processSelectionTouch(ev);
        };
        this.removeTouchListeners = () => {
            const svgRef = this.svgRef.current;
            if (svgRef) {
                svgRef.removeEventListener("touchmove", this.processSelectionTouch);
                svgRef.removeEventListener("touchend", this.removeTouchListeners);
            }
            if (this.props.onControlFinished) {
                this.props.onControlFinished();
            }
        };
        this.processSelection = (ev) => {
            const { size, maxValue, minValue, angleType, startAngle, endAngle, handle1, disabled, handle2, coerceToInt } = this.props;
            if (!handle1.onChange) {
                return;
            }
            const svgRef = this.svgRef.current;
            if (!svgRef) {
                return;
            }
            const svgPoint = svgRef.createSVGPoint();
            const x = ev.clientX;
            const y = ev.clientY;
            svgPoint.x = x;
            svgPoint.y = y;
            const coordsInSvg = svgPoint.matrixTransform(svgRef.getScreenCTM().inverse());
            const angle = circularGeometry_1.positionToAngle(coordsInSvg, size, angleType);
            let value = circularGeometry_1.angleToValue({
                angle,
                minValue,
                maxValue,
                startAngle,
                endAngle
            });
            if (coerceToInt) {
                value = Math.round(value);
            }
            if (!disabled) {
                if (handle2 &&
                    handle2.onChange &&
                    Math.abs(value - handle2.value) < Math.abs(value - handle1.value)) {
                    handle2.onChange(value);
                }
                else {
                    handle1.onChange(value);
                }
            }
        };
        this.processSelectionTouch = (ev) => {
            const { size, maxValue, minValue, angleType, startAngle, endAngle, handle1, disabled, handle2, coerceToInt } = this.props;
            if (!handle1.onChange) {
                return;
            }
            const svgRef = this.svgRef.current;
            if (!svgRef) {
                return;
            }
            const svgPoint = svgRef.createSVGPoint();
            const x = ev.touches[0].clientX;
            const y = ev.touches[0].clientY;
            svgPoint.x = x;
            svgPoint.y = y;
            const coordsInSvg = svgPoint.matrixTransform(svgRef.getScreenCTM().inverse());
            const angle = circularGeometry_1.positionToAngle(coordsInSvg, size, angleType);
            let value = circularGeometry_1.angleToValue({
                angle,
                minValue,
                maxValue,
                startAngle,
                endAngle
            });
            if (coerceToInt) {
                value = Math.round(value);
            }
            if (!disabled) {
                if (handle2 &&
                    handle2.onChange &&
                    Math.abs(value - handle2.value) < Math.abs(value - handle1.value)) {
                    handle2.onChange(value);
                }
                else {
                    handle1.onChange(value);
                }
            }
        };
    }
    render() {
        const { size, handle1, handle2, handleSize, maxValue, minValue, startAngle, endAngle, angleType, disabled, arcColor, arcBackgroundColor, outerShadow } = this.props;
        const trackWidth = 4;
        const shadowWidth = 20;
        const trackInnerRadius = size / 2 - trackWidth - shadowWidth;
        const handle1Angle = circularGeometry_1.valueToAngle({
            value: handle1.value,
            minValue,
            maxValue,
            startAngle,
            endAngle
        });
        const handle2Angle = handle2 &&
            circularGeometry_1.valueToAngle({
                value: handle2.value,
                minValue,
                maxValue,
                startAngle,
                endAngle
            });
        const handle1Position = circularGeometry_1.angleToPosition(Object.assign({ degree: handle1Angle }, angleType), trackInnerRadius + trackWidth / 2, size);
        const handle2Position = handle2Angle &&
            circularGeometry_1.angleToPosition(Object.assign({ degree: handle2Angle }, angleType), trackInnerRadius + trackWidth / 2, size);
        const controllable = !disabled && Boolean(handle1.onChange);
        return (React.createElement("svg", { style: {
                touchAction: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none"
            }, width: size, height: size, ref: this.svgRef, onMouseDown: this.onMouseDown, onMouseEnter: this.onMouseEnter, onTouchStart: this.onTouchStart, onClick: ev => controllable && ev.stopPropagation() },
            outerShadow && (React.createElement(React.Fragment, null,
                React.createElement("radialGradient", { id: "outerShadow" },
                    React.createElement("stop", { offset: "90%", stopColor: arcColor }),
                    React.createElement("stop", { offset: "100%", stopColor: "white" })),
                React.createElement("circle", { fill: "none", stroke: "url(#outerShadow)", cx: size / 2, cy: size / 2, r: trackInnerRadius + trackWidth + shadowWidth / 2 - 1, strokeWidth: shadowWidth }))),
            handle2Angle === undefined ? (React.createElement(React.Fragment, null,
                React.createElement("path", { d: svgPaths_1.arcPathWithRoundedEnds({
                        startAngle: handle1Angle,
                        endAngle,
                        angleType,
                        innerRadius: trackInnerRadius,
                        thickness: trackWidth,
                        svgSize: size,
                        direction: angleType.direction
                    }), fill: arcBackgroundColor }),
                React.createElement("path", { d: svgPaths_1.arcPathWithRoundedEnds({
                        startAngle,
                        endAngle: handle1Angle,
                        angleType,
                        innerRadius: trackInnerRadius,
                        thickness: trackWidth,
                        svgSize: size,
                        direction: angleType.direction
                    }), fill: arcColor }))) : (React.createElement(React.Fragment, null,
                React.createElement("path", { d: svgPaths_1.arcPathWithRoundedEnds({
                        startAngle,
                        endAngle: handle1Angle,
                        angleType,
                        innerRadius: trackInnerRadius,
                        thickness: trackWidth,
                        svgSize: size,
                        direction: angleType.direction
                    }), fill: arcBackgroundColor }),
                React.createElement("path", { d: svgPaths_1.arcPathWithRoundedEnds({
                        startAngle: handle2Angle,
                        endAngle,
                        angleType,
                        innerRadius: trackInnerRadius,
                        thickness: trackWidth,
                        svgSize: size,
                        direction: angleType.direction
                    }), fill: arcBackgroundColor }),
                React.createElement("path", { d: svgPaths_1.arcPathWithRoundedEnds({
                        startAngle: handle1Angle,
                        endAngle: handle2Angle,
                        angleType,
                        innerRadius: trackInnerRadius,
                        thickness: trackWidth,
                        svgSize: size,
                        direction: angleType.direction
                    }), fill: arcColor }))),
            controllable && (React.createElement(React.Fragment, null,
                React.createElement("filter", { id: "handleShadow", x: "-50%", y: "-50%", width: "16", height: "16" },
                    React.createElement("feOffset", { result: "offOut", in: "SourceGraphic", dx: "0", dy: "0" }),
                    React.createElement("feColorMatrix", { result: "matrixOut", in: "offOut", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" }),
                    React.createElement("feGaussianBlur", { result: "blurOut", in: "matrixOut", stdDeviation: "5" }),
                    React.createElement("feBlend", { in: "SourceGraphic", in2: "blurOut", mode: "normal" })),
                React.createElement("circle", { r: handleSize, cx: handle1Position.x, cy: handle1Position.y, fill: "#ffffff", filter: "url(#handleShadow)" }))),
            handle2Position && (React.createElement(React.Fragment, null,
                React.createElement("circle", { r: handleSize, cx: handle2Position.x, cy: handle2Position.y, fill: "#ffffff", filter: "url(#handleShadow)" })))));
    }
}
exports.CircularSlider = CircularSlider;
CircularSlider.defaultProps = {
    size: 200,
    minValue: 0,
    maxValue: 100,
    startAngle: 0,
    endAngle: 360,
    angleType: {
        direction: "cw",
        axis: "-y"
    },
    handleSize: 8,
    arcBackgroundColor: "#aaa"
};
class CircularSliderWithChildren extends React.Component {
    render() {
        const { size } = this.props;
        return (React.createElement("div", { style: {
                width: size,
                height: size,
                position: "relative"
            } },
            React.createElement(CircularSlider, Object.assign({}, this.props)),
            React.createElement("div", { style: {
                    position: "absolute",
                    top: "25%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                } }, this.props.children)));
    }
}
exports.CircularSliderWithChildren = CircularSliderWithChildren;
CircularSliderWithChildren.defaultProps = CircularSlider.defaultProps;
exports.default = CircularSlider;
