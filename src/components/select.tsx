import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Iprops {
    className?: string,
    listDatas: any[],
    name: string,
    value: string | undefined,
    setValue: any,
    key1: string,
    key2: string,
    key3?: string,
    addChar?: boolean
}

export default function SelectCustom({ className = '', listDatas, name, value, setValue, key1, key2, key3, addChar }: Iprops) {

    console.log(listDatas, listDatas);


    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <div className={className ? className : 'md:w-[270px]'} >
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={name}
                    onChange={handleChange}
                >
                    {
                        listDatas?.map(item => <MenuItem value={item[key1]}>{addChar ? 'K' + item[key2] : (key3 ? item[key2] + `  (${item[key3]})` : item[key2])}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div >
    );
}