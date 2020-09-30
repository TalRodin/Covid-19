import React, {useState,useEffect} from 'react';
import Pie from './Pie';
import './PieChart.css'

function ChartLine() {
  const [data_, setData]= useState({})

  useEffect(()=>{
    
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then(response=>response.json())
    .then(data=>{
      setData(data)
      console.log(data)
    })
  },[])



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
            <h3 className='pie'>Worldwide Cases, Recovered, Deaths</h3>
            <svg width='400' height='400' viewBox="100 -100 500 700" >
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