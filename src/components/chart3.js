import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";



export default function DiskChart(props) {
  const [ values, setValues ] = useState([])

  const COLORS = ["rgb(53, 224, 195)", "#476b6b"];
  useEffect(()=>{
    setValues(props.data)
  },[props])
  return (
    <PieChart width={250} height={200}>
      <Pie
        data={values}
        cx={120}
        cy={80}
        innerRadius={55}
        outerRadius={80}
        startAngle={-90}
        endAngle={-450}
        stroke='#292d35'
        fill="black"
        paddingAngle={2}
        dataKey="value"
        isAnimationActive={false}
        label
      >
        {values.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}