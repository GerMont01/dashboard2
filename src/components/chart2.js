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

export default function CpuUsage(props) {
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
        <Legend />
        <Area type='linear' dataKey="CPU_Usage" dot={false} isAnimationActive={false} stroke="rgb(53, 224, 195)" fill="rgb(53, 224, 195)" />
        </AreaChart>
    );
}
