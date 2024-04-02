import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
    width: number;
    height: number;
    label?: string;
    data: { name: string; value: number }[];
};

type textProps = {
    x: number,
    y: number,
    text: string,
    xv: number,
    yv: number,
    textv: number
}

const TextWidthMeasure = ({ x, y, text, xv, yv, textv }: textProps) => {
    const textRef = useRef(null);
    const [textWidth, setTextWidth] = useState(0)

    useEffect(() => {
        const textElement: any = d3.select(textRef.current);
        setTextWidth(textElement.node().getComputedTextLength());
        console.log('Text Width:', textWidth);
    }, [text]);

    return (
        <>
            <text
                x={xv}
                y={yv}
                textAnchor="end"
                alignmentBaseline="central"
                fontSize={12}
                opacity={textWidth < xv - 14 ? 1 : 0} // hide label if bar is not wide enough
            >
                {textv}
            </text>
            <text
                ref={textRef}
                x={x}
                y={y}
                textAnchor="start"
                alignmentBaseline="central"
                fontSize={12}
            >
                {text + ((textWidth < xv - 14) ? '' : `   ${textv}`)}
            </text>
        </>
    );
};

export const BarchartHorizontal = ({ width, height, data, label }: BarplotProps) => {
    console.log('label', label);

    // bounds = area inside the graph axis = calculated by substracting the margins
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    console.log('boundsHeight', boundsHeight);


    // Y axis is for groups since the barplot is horizontal
    const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(groups)
            .range([0, boundsHeight])
            .padding(BAR_PADDING);
    }, [data, height]);

    // X axis
    const xScale = useMemo(() => {
        const [min, max] = d3.extent(data.map((d) => d.value));
        return d3
            .scaleLinear()
            .domain([0, max || 10])
            .range([0, boundsWidth]);
    }, [data, width]);

    function getTextWidth(text: any, font: any) {
        const canvas = document.createElement('canvas');
        const context: any = canvas.getContext('2d');

        context.font = font || getComputedStyle(document.body).font;

        return context.measureText(text).width;
    }
    console.log('dutest', getTextWidth('IT137IU Data Analysis', 12));

    // Build the shapes
    const allShapes = data.map((d, i) => {
        const y = yScale(d.name);
        if (y === undefined) {
            return null;
        }

        if (d.name == 'IT069IU Object Oriented Programming') {
            console.log('dutest1', xScale(d.value))
        }

        return (
            <g key={i}>
                <rect
                    x={xScale(0)}
                    y={yScale(d.name)}
                    width={xScale(d.value)}
                    height={yScale.bandwidth()}
                    opacity={0.7}
                    stroke="#9d174d"
                    fill="#9d174d"
                    fillOpacity={0.3}
                    strokeWidth={1}
                    rx={1}
                />
                {/* <text
                    x={xScale(d.value) - 7}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="end"
                    alignmentBaseline="central"
                    fontSize={12}
                    opacity={xScale(d.value) > 90 ? 1 : 0} // hide label if bar is not wide enough
                >
                    {d.value}
                </text> */}
                <TextWidthMeasure
                    x={xScale(0) + 7}
                    y={y + yScale.bandwidth() / 2}
                    text={d.name}
                    xv={xScale(d.value) - 7}
                    yv={y + yScale.bandwidth() / 2}
                    textv={d.value}
                />
                {/* <text
                    x={xScale(0) + 7}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="start"
                    alignmentBaseline="central"
                    fontSize={12}
                >
                    {d.name + ((getTextWidth(d.name, 12) < xScale(d.value)) ? '' : `   ${d.value}`)}
                </text> */}
            </g>
        );
    });

    const grid = xScale
        .ticks(5)
        .slice(1)
        .map((value, i) => (
            <g key={i}>
                <line
                    x1={xScale(value)}
                    x2={xScale(value)}
                    y1={0}
                    y2={boundsHeight}
                    stroke="#808080"
                    opacity={0.2}
                />
                <text
                    x={xScale(value)}
                    y={boundsHeight + 10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={11}
                    stroke="#808080"
                    opacity={0.8}
                >
                    {((i == 0 && label) ? label : '') + '  ' + value.toString()}
                </text>
            </g>
        ));

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {grid}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};
