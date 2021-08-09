import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function MemoryChart(props) {
    const [ values, setValues ] = useState([])
    useEffect(()=>{
        setValues(props.data)
    },[props])
    return (
        <AreaChart
            width={window.innerWidth/3.4}
            height={window.innerHeight/2.5}
            data={values}
        >
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]}/>
        <Tooltip />
        <Legend color="rgb(53, 224, 195)" />
        <Area type="monotone" dataKey="Memory_Usage" dot={false} isAnimationActive={false} stroke="rgb(53, 224, 195)" fill="rgb(53, 224, 195)"/>
        </AreaChart>
    );
}
