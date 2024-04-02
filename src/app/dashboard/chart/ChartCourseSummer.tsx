import { API_URL } from '@/app/global';
import SelectCustom from '@/components/select';
import React, { useEffect, useState } from 'react'
import { useApiMajor } from '@/api/useApiMajor';
import { useApiEnroll } from '@/api/useApiEnroll';
import { BarchartHorizontal } from '../components/bar_horizontal_transition/BarchartHorizontal';

type DonutChartProps = {
    width: number;
    height: number;
};

export default function ChartCourseSummer({ width, height }: DonutChartProps) {
    const { majors } = useApiMajor();
    const { enrolls } = useApiEnroll();
    const [selectedData, setSelectedData] = useState<any[]>();
    const [total, setTotal] = useState<number>(0)
    const [major, setMajor] = useState<string>('')
    const [enrollment, setEnroll] = useState<string>('');


    // const [dataMajorValues, setDataMajorValues] = useState([])
    // const [dataEnrollValues, setDataEnrollValues] = useState([])
    // useEffect(() => {
    //     const getApiCourse = async () => {
    //         try {
    //             const res1 = await fetch(`${API_URL}/dashboard/get-major`)
    //             const res2 = await fetch(`${API_URL}/dashboard/get-enroll`)
    //             const data1 = await res1.json()
    //             const data2 = await res2.json()
    //             setDataMajorValues(data1)
    //             setMajor(data1[0]['_id'])
    //             setDataEnrollValues(data2)
    //             setEnroll(data2[0]['_id'])
    //         } catch (e) {
    //             return e;
    //         }
    //     }
    //     getApiCourse()
    // }, [])

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard/course/summary`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        major,
                        enrollment,
                    }),
                })
                const db = await res.json();
                const newVal = db.map((item: any) => {
                    return {
                        name: item._id,
                        value: item.count
                    }
                })
                const tStudent = newVal.map((item: any) => item.value).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
                setTotal(tStudent)
                setSelectedData(newVal)

            } catch (e) {
                return e;
            }
        }
        getApiCourseSummary()
    }, [major, enrollment])

    useEffect(() => {
        if (majors && majors.length) {
            setMajor(majors[0]['_id'])
        }
        if (enrolls && enrolls.length) {
            setEnroll(enrolls[0]['_id'])
        }
    }, [majors, enrolls])

    return (
        <div className='flex flex-col gap-2 pl-2 pr-2'>
            <p className='mt-3 font-semibold'>Chart Course Summer</p>
            <div className="grid md:flex gap-2 mt-3 items-center">
                <SelectCustom listDatas={majors} name='Major' value={major} setValue={setMajor} key1="_id" key2="_id" key3="detail" />
                <SelectCustom listDatas={enrolls} name='Enrrol' value={enrollment} setValue={setEnroll} key1="_id" key2="_id" addChar={true} />
                <div className='flex'>
                    <div className=" text-orange-800">TotalStudent:</div>
                    <span className="text-[rgb(71,71,71)]">{total}</span>
                </div>
            </div>
            {selectedData && (<BarchartHorizontal
                width={width}
                height={selectedData?.length < 25 ? height : 650}
                data={selectedData}
                label='Total'
            />)}
        </div>
    )
}
