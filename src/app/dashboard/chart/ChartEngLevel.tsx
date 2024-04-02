import { useEffect, useState } from "react";
import SelectCustom from "@/components/select";
import { API_URL } from "@/app/global";
import { useApiMajor } from "@/api/useApiMajor";
import { PieChart } from "../components/pie_transition/PieChart";

type BarplotDatasetTransitionProps = {
    width: number;
    height: number;
};

const overViewData = [
    {
        name: 'IE0',
        value: 0
    }, {
        name: 'IE1',
        value: 0
    }, {
        name: 'IE2',
        value: 0
    }, {
        name: 'IE3',
        value: 0
    }, {
        name: 'AE1',
        value: 0
    },
    {
        name: 'AE2',
        value: 0
    },
    {
        name: 'Total',
        value: 0
    }
]

const levels = overViewData.map(x => x.name)


export const ChartEngLevel = ({
    width,
    height,
}: BarplotDatasetTransitionProps) => {
    const { majors } = useApiMajor();
    const [selectedData, setSelectedData] = useState();
    const [major, setMajor] = useState('');
    const [overView, setOverView] = useState(overViewData)


    useEffect(() => {
        if (majors && majors.length) {
            setMajor(majors[0]['_id'])
        }
    }, [majors])

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                if (major) {
                    const res = await fetch(`${API_URL}/dashboard/count-class-by-english-level?major=${major}`)
                    const db = await res.json();
                    const newVal = db.map((item: any, index: number) => {
                        return {
                            name: item._id,
                            value: item.count
                        }
                    }).filter((y: any) => levels.includes(y.name))

                    setOverView(overView.map((item: any) => {
                        if (item.name != 'Total')
                            return {
                                ...item,
                                value: db.find((ele: any) => ele._id == item.name)?.count | 0
                            }
                        return {
                            ...item,
                            value: newVal.map((item: any) => item.value).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)
                        }
                    }))
                    setSelectedData(newVal)
                }
            } catch (e) {
                return e;
            }
        }
        getApiCourseSummary()
    }, [major])

    return (
        <div className='flex flex-col gap-2 pl-2 pr-2 relative'>
            <p className='mt-3 font-semibold'>Chart Major Class By English Level</p>
            <div className="flex gap-2 mt-3">
                <SelectCustom listDatas={majors} name='Major' value={major} setValue={setMajor} key1="_id" key2="_id" key3="detail" />
            </div>
            <div className="absolute right-2 md:top-3 top-[100px] grid grid-cols-2 gap-2">
                {selectedData && (
                    overView.map((item, index) => {
                        return (
                            <div className={`flex ${index + 1 == overViewData.length ? 'col-start-2' : ''}`} key={index}>
                                <div className="w-[50px] text-orange-800">{item.name}:</div>
                                <span className="text-[rgb(71,71,71)]">{item.value}</span>
                            </div>)
                    }))
                }
            </div>
            <div className="text-center">
                {
                    selectedData && (<PieChart
                        width={width}
                        height={height}
                        data={selectedData}
                    />)
                }
            </div>
        </div>
    );
};
