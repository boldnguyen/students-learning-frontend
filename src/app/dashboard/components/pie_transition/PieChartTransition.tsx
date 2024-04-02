import { API_URL } from '@/app/global';
import SelectCustom from '@/components/select';
import React, { useEffect, useState } from 'react'
import { PieChart } from './PieChart';
import { useApiMajor } from '@/api/useApiMajor';
import { useApiEnroll } from '@/api/useApiEnroll';

type DonutChartProps = {
    width: number;
    height: number;
};

export default function PieChartTransition({ width, height }: DonutChartProps) {
    const { majors } = useApiMajor();
    const { enrolls } = useApiEnroll();
    const [selectedData, setSelectedData] = useState();
    const [major, setMajor] = useState<string>('')
    const [enrollment, setEnroll] = useState<string>('');

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard/course/avg`, {
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
                        value: item.avg
                    }
                })
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
            <p className='mt-3 font-semibold'>Chart Course Avg</p>
            <div className="flex gap-2 mt-3">
                <SelectCustom listDatas={majors} name='Major' value={major} setValue={setMajor} key1="_id" key2="_id" />
                <SelectCustom listDatas={enrolls} name='Enrrol' value={enrollment} setValue={setEnroll} key1="_id" key2="_id" addChar={true} />
            </div>
            {selectedData && (<PieChart
                width={width}
                height={height}
                data={selectedData}
            />)}
        </div>
    )
}
