import { useEffect, useState } from "react";
import { BarchartHorizontal } from "../components/bar_horizontal_transition/BarchartHorizontal";
import SelectCustom from "@/components/select";
import { API_URL } from "@/app/global";
import { useApiCourse } from "@/api/useApiCourse";

const BUTTONS_HEIGHT = 50;

type BarplotDatasetTransitionProps = {
    width: number;
    height: number;
};

export const ChartCourseMajor = ({
    width,
    height,
}: BarplotDatasetTransitionProps) => {
    const { courses } = useApiCourse();
    const [selectedData, setSelectedData] = useState();
    const [course, setCourse] = useState('')

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard/course-score-by-major?name=${course}`)
                const db = await res.json();
                const newVal = db.map((item: any) => {
                    if (item._id) {
                        let x = item._id
                        switch (item._id) {
                            case 'CE':
                                x = 'Computer Engineering'
                                break;
                            case 'CS':
                                x = 'Computer Science'
                                break;
                            case 'DS':
                                x = 'Data Science'
                                break;
                            case 'NE':
                                x = 'Network Engineering'
                                break;
                            default:
                                break;
                        }
                        return {
                            name: x,
                            value: Math.round(parseFloat(item.avg) * 100) / 100
                        }
                    }
                }).filter((ele: any) => ele != undefined)
                console.log('newValha', newVal);

                setSelectedData(newVal)

            } catch (e) {
                return e;
            }
        }
        course && getApiCourseSummary()
    }, [course])

    useEffect(() => {
        if (courses && courses.length) {
            setCourse(courses[0]['_id'])
        }
    }, [courses])


    return (
        <div className='flex flex-col gap-2 pl-2 pr-2'>
            <p className='mt-3 font-semibold capitalize'>Chart course score by major</p>
            <div className="flex gap-2 mt-3">
                <SelectCustom className="w-[270px] md:w-[400px]" listDatas={courses} name='course' value={course} setValue={setCourse} key1="_id" key2="_id" />
            </div>
            {selectedData && (<BarchartHorizontal
                width={width}
                height={height}
                data={selectedData}
                label='Avg Point'
            />)}
        </div>
    );
};
