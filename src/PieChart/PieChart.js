import React, {useState,useEffect} from 'react';
import Pie from './Pie';

function ChartLine() {
  const [data_, setData]= useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then(response=>response.json())
    .then(data=>{
      setData(data)
      console.log(data)
    })
    }, 1000);
    return () => clearInterval(interval);
  }, []);



        let data=[
          {name: "cases", value: data_.cases},
          {name: "recovered", value: data_.recovered},
          {name: "death", value: data_.deaths},
        ]
        let width = 700;
        let height = Math.min(width, 500);
        let radius = Math.min(width, height)/2 ;
        let x = width/2;
        let y = height/2;
        return (
          <div>
            <svg width='600' height='600' viewBox="0 -100 500 900" >
              <Pie x={x} y={y} 
                radius={radius} 
                innerRadius={radius * 0.5}
                outerRadius={Math.min(width, height) / 2 - 1}
                cornerRadius={5}
                padAngle={.005}
                data={data} />
            </svg>
          </div> 
        );
}
export default ChartLine;