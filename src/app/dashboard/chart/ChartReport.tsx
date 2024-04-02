import { useEffect, useRef, useState } from "react";
import SelectCustom from "@/components/select";
import { API_URL } from "@/app/global";
import { useApiCourse } from "@/api/useApiCourse";
import { useApiVersion } from "@/api/useApiVersion";
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


export const ChartReport = ({
    width,
    height,
}: BarplotDatasetTransitionProps) => {
    const { versions } = useApiVersion();
    const [selectedData, setSelectedData] = useState();
    const [version, setVersion] = useState('');
    const max = useRef<number>(300)

    useEffect(() => {
        const getApiCourseSummary = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard/get-report-chart?version=${version}`)
                const db = await res.json();
                db.sort((a: any, b: any) => a._id - b._id)
                max.current = Math.floor(Math.max(...db.map((o: any) => o.count))) + 100;
                const newVal = db.map((item: any) => {
                    return {
                        x: 'year ' + item._id.toString(),
                        groupA: item.count
                    }
                })
                console.log('newVal', newVal);

                setSelectedData(newVal)

            } catch (e) {
                return e;
            }
        }
        getApiCourseSummary()
    }, [version])

    useEffect(() => {
        if (versions && versions.length) {
            setVersion(versions[0]['_id'])
        }
    }, [versions])


    return (
        <div className='flex flex-col gap-2 pl-2 pr-2'>
            <p className='mt-3 font-semibold'>Chart report</p>
            <div className="flex gap-2 mt-3">
                <SelectCustom listDatas={versions} name='Version' value={version} setValue={setVersion} key1="_id" key2="_id" />
                <div className="text-[14px] pl-4">
                    <p><span className="text-orange-800">X: </span>Year</p>
                    <p><span className="text-orange-800">Y: </span>Number of classes open for IT students</p>
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
