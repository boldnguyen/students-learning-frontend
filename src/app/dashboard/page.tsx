'use client'
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../global';
import { ChartEngLevel } from './chart/ChartEngLevel';
import { ChartCourseEnroll } from './chart/ChartCourseEnroll';
import ChartCourseAvg from './chart/ChartCourseAvg';
import ChartCourseSummer from './chart/ChartCourseSummer';
import { ChartCourseMajor } from './chart/ChartCourseMajor';
import { ChartReport } from './chart/ChartReport';
import ChartNew from './chart/ChartNew';

export default function Page() {
    const [widthChart, setwidthChart] = useState({
        w1: 500,
        w2: 1084,
        w3: 1074
    })
    useEffect(() => {
        if (window.screen.width <= 820) {
            const val = window.screen.width - 64
            setwidthChart({
                ...widthChart,
                w1: val,
                w2: val,
                w3: val
            })
        }
    }, [])

    return (
        <div>
            <div className='flex flex-col gap-4 mb-3'>
                <div className='grid lg:grid-cols-2 gap-4'>
                    {/* <div className="bg-white overflow-hidden rounded shadow-4xl h-[350px]">
                        <BarplotDatasetTransition width={348} height={300} />
                    </div> */}
                    <div className="bg-white overflow-hidden rounded shadow-4xl h-[510px]">
                        <ChartEngLevel width={widthChart.w1} height={350} />
                    </div>
                    <div className="bg-white overflow-hidden rounded shadow-4xl h-[510px]">
                        <ChartCourseEnroll width={widthChart.w1} height={350} />
                    </div>
                </div>
                <div className="bg-white overflow-hidden rounded shadow-4xl h-[454px]">
                    <ChartReport width={widthChart.w2} height={350} />
                </div>
                <div className="bg-white overflow-hidden rounded shadow-4xl h-[454px]">
                    <ChartCourseMajor width={widthChart.w2} height={350} />
                </div>
                <div className="bg-white overflow-auto rounded shadow-4xl h-[554px]">
                    <ChartCourseSummer width={widthChart.w3} height={450} />
                </div>
                <div className="bg-white overflow-auto rounded shadow-4xl h-[554px]">
                    <ChartCourseAvg width={widthChart.w3} height={450} />
                </div>
                <div className="bg-white overflow-auto rounded shadow-4xl h-[654px]">
                    <ChartNew width={widthChart.w3} height={500} />
                </div>
            </div>
        </div>
    )
}
