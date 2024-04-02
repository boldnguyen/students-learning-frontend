export const data = [
    {name:"Mark", value: 90},
    {name:"Robert", value: 12},
    {name:"Emily", value: 34},
    {name:"Marion", value: 53},
    {name:"Nicolas", value: 98},
    {name:"Mélanie", value: 23},
    {name:"Gabriel", value: 18},
    {name:"Jean", value: 104},
    {name:"Paul", value: 2},
]

export const data2 = [
    {name:"Mark", value: 9},
    {name:"Robert", value: 19},
    {name:"Emily", value: 31},
    {name:"Marion", value: 23},
    {name:"Nicolas", value: 38},
    {name:"Mélanie", value: 123},
    {name:"Gabriel", value: 4},
    {name:"Jean", value: 23},
    {name:"Christophe", value: 22},
]

export const chartColors = [
    "#f8a659",
    "#832b43",
    "#c6a352",
    "#9ce62f",
    "#ace6cd"
]

const generateUniqueColors = (length:number) => {
    const colors = new Set();

    while (colors.size < length) {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        colors.add("#" + color);
    }

    return Array.from(colors);

};

export default generateUniqueColors; 