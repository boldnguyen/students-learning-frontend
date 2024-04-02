import { API_URL } from '@/app/global';
import SelectCustom from '@/components/select';
import React, { useEffect, useState } from 'react'
import { useApiMajor } from '@/api/useApiMajor';
import { useApiEnroll } from '@/api/useApiEnroll';
import { BarchartHorizontalGroup } from '../components/bar_horizontal_transition/BarchartHorizontalGroup';

type ChartCourseSummer = {
    width: number;
    height: number;
};

export default function ChartNew({ width, height }: ChartCourseSummer) {
    const { majors } = useApiMajor();
    const { enrolls } = useApiEnroll();
    const [selectedData, setSelectedData] = useState<{ group: string; subgroup: string; value: number }[]>([]);
    const [major, setMajor] = useState<string>('')
    const [enrollment, setEnroll] = useState<string>('');
    const [sem, setSem] = useState<string>('1')
    const [year, setYear] = useState<string>('1')
    const [total, setTotal] = useState<any>({
        totalStudentLearnedFail: 0,
        totalStudent: 0,
        totalStudentLearnedPass: 0
    })

    useEffect(() => {
        if (majors && majors.length) {
            setMajor(majors[0]['_id'])
        }
        if (enrolls && enrolls.length) {
            setEnroll(enrolls[0]['_id'])
        }
    }, [majors, enrolls])

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                if (major && enrollment && sem && year) {
                    const res = await fetch(`${API_URL}/dashboard/get-new-chart?major=${major}&enroll=${enrollment}&semester=${sem}&year=${year}`)
                    const db = await res.json();
                    console.log('db', db);

                    const transformedArr = db.data.flatMap((item: any) => [
                        { group: item.group, subgroup: 'totalStudentLearnedPass', value: item.totalStudentLearnedPass },
                        { group: item.group, subgroup: 'totalStudentLearnedFail', value: item.totalStudentLearnedFail }
                    ]);
                    console.log('transformedArr', transformedArr);

                    const totalStudentLearnedPass = db.data.map((item: any) => item.totalStudentLearnedPass).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
                    const totalStudentLearnedFail = db.data.map((item: any) => item.totalStudentLearnedFail).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
                    const totalStudent = db.total
                    setTotal({
                        ...total,
                        totalStudentLearnedPass,
                        totalStudent,
                        totalStudentLearnedFail
                    })
                    setSelectedData(transformedArr)
                }
            } catch (e) {
                return e;
            }
        }
        getApiCourseSummary()
    }, [major, enrollment, sem, year])

    return (
        <div className='flex flex-col gap-2 pl-2 pr-2'>
            <p className='mt-3 font-semibold'>Progess Chart</p>
            <div className="grid md:flex gap-2 mt-3 items-center">
                <SelectCustom listDatas={majors} name='Major' value={major} setValue={setMajor} key1="_id" key2="_id" key3="detail" />
                <SelectCustom listDatas={enrolls} name='Enrrol' value={enrollment} setValue={setEnroll} key1="_id" key2="_id" addChar={true} />
                <SelectCustom listDatas={[{ _id: '1' }, { _id: '2' }]} name='Semester' value={sem} setValue={setSem} key1="_id" key2="_id" />
                <SelectCustom listDatas={[{ _id: '1' }, { _id: '2' }, { _id: '3' }, { _id: '4' }]} name='Year' value={year} setValue={setYear} key1="_id" key2="_id" />
            </div>
            <div className='flex md:gap-5 md:flex-row flex-col gap-2'>
                <div className='flex gap-2'>
                    <span className="text-orange-800">TotalStudentLearnedPass:</span>
                    <span className="text-[rgb(71,71,71)]">{total.totalStudentLearnedPass}</span>
                </div>
                <div className='flex gap-2'>
                    <span className="text-orange-800">TotalStudentLearnedFail:</span>
                    <span className="text-[rgb(71,71,71)]">{total.totalStudentLearnedFail}</span>
                </div>
                <div className='flex gap-2'>
                    <span className="text-orange-800">TotalStudent:</span>
                    <span className="text-[rgb(71,71,71)]">{total.totalStudent}</span>
                </div>
            </div>
            {selectedData.length ? (<BarchartHorizontalGroup
                width={width}
                height={height}
                data={selectedData}
            />) : <></>}
        </div>
    )
}
