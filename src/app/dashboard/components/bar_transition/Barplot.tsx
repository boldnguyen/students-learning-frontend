import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type Group = {
    x: string;
} & { [key: string]: number };

type StackedBarplotProps = {
    width: number;
    height: number;
    maxC?: number;
    data: Group[];
};

export const Barplot = ({
    width,
    height,
    data,
    maxC
}: StackedBarplotProps) => {
    // bounds = area inside the graph axis = calculated by substracting the margins
    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const allGroups = data.map((d) => String(d.x));
    const allSubgroups = ["groupA"]; // todo

    // Data Wrangling: stack the data
    const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
    //.offset(d3.stackOffsetNone);
    const series = stackSeries(data);

    // Y axis
    let max = maxC; // todo
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, max || 0])
            .range([boundsHeight, 0]);
    }, [data, height]);

    // X axis
    const xScale = useMemo(() => {
        return d3
            .scaleBand<string>()
            .domain(allGroups)
            .range([0, boundsWidth])
            .padding(0.05);
    }, [data, width]);

    // Color Scale
    var colorScale = d3
        .scaleOrdinal<string>()
        .domain(allGroups)
        .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

    // Render the X and Y axis using d3.js, not react
    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale);
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [xScale, yScale, boundsHeight]);

    const rectangles = series.map((subgroup, i) => {
        console.log('subgroup', subgroup);

        return (
            <g key={i}>
                {subgroup.map((group, j) => {
                    return (
                        <g>
                            <rect
                                key={j}
                                x={xScale(`${group.data.x}`)}
                                y={yScale(group[1])}
                                height={yScale(group[0]) - yScale(group[1])}
                                width={xScale.bandwidth()}
                                fill={colorScale(subgroup.key)}
                                opacity={0.9}
                            ></rect>
                            <text
                                x={xScale(`${group.data.x}`)}
                                y={yScale(group[1] / 2)}
                                dx={xScale.bandwidth() / 1.85}
                                textAnchor="end"
                                alignmentBaseline="central"
                                fontSize={12}
                            >
                                {Math.round(group[1] * 10) / 10}
                            </text>
                        </g>
                    );
                })}
            </g>
        );
    });

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {rectangles}
                </g>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                />
            </svg>
        </div>
    );
};
