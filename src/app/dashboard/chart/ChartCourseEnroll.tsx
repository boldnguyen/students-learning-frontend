import { useEffect, useRef, useState } from "react";
import SelectCustom from "@/components/select";
import { API_URL } from "@/app/global";
import { LineChart } from "../components/line_transition/LineChart";
import { useApiMajor } from "@/api/useApiMajor";
import { useApiCourse } from "@/api/useApiCourse";
import { Barplot } from "../components/bar_transition/Barplot";

const BUTTONS_HEIGHT = 50;

type BarplotDatasetTransitionProps = {
    width: number;
    height: number;
};

const buttonStyle = {
    border: "1px solid #9a6fb0",
    borderRadius: "3px",
    padding: "4px 8px",
    margin: "10px 2px",
    fontSize: 14,
    color: "#9a6fb0",
    opacity: 0.7,
};


export const ChartCourseEnroll = ({
    width,
    height,
}: BarplotDatasetTransitionProps) => {
    const { courses } = useApiCourse();
    const [selectedData, setSelectedData] = useState();
    const [course, setCourse] = useState('')
    const max = useRef<number>(300);

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard/course-score-by-enrollment?name=${course}`)
                const db = await res.json();
                db.sort((a: any, b: any) => a._id - b._id)
                max.current = Math.floor(Math.max(...db.map((o: any) => o.avg))) + 100;

                const newVal = db.map((item: any) => {
                    return {
                        x: 'K' + item._id.toString(),
                        groupA: item.avg
                    }
                })
                setSelectedData(newVal)

            } catch (e) {
                return e;
            }
        }
        getApiCourseSummary()
    }, [course])

    useEffect(() => {
        if (courses && courses.length) {
            setCourse(courses[0]['_id'])
        }
    }, [courses])

    return (
        <div className='flex flex-col gap-2 pl-2 pr-2'>
            <p className='mt-3 font-semibold'>Chart Course Score By Enrollment</p>
            <div className="flex flex-col gap-2 mt-3">
                <SelectCustom className="w-[270px] md:w-[400px]" listDatas={courses} name='course' value={course} setValue={setCourse} key1="_id" key2="_id" />
                <div className="text-[14px] pl-4">
                    <p><span className="text-orange-800">X: </span>Enrollment</p>
                    <p><span className="text-orange-800">Y: </span>Student's average score</p>
                </div>
            </div>
            {selectedData && (<Barplot
                width={width}
                height={height}
                maxC={max.current}
                data={selectedData}
            />)}
        </div>
    );
};
