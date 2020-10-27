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
          {name: "Cases", value: data_.cases},
          {name: "Recovered", value: data_.recovered},
          {name: "Death", value: data_.deaths},
        ]
        let width = 580;
        let height = Math.min(width, 500);
        let margin = 40
        let radius = Math.min(width, height)/2 -margin ;
        let x = width/2;
        let y = height/2;
        return (
          <div>
            <h3 className='pie'>Worldwide Cases, Recovered, Deaths</h3>
            <svg width='1000' height='700' viewBox="0 -100 500 900" >
            <Pie x={x} y={y} 
                radius={radius} 
                innerRadius={radius * 0.67}
                outerRadius={Math.min(width, height) / 2 - 1}
                cornerRadius={3}
                padAngle={.005}
                data={data} />
            </svg>
          </div> 
        );
}
export default ChartLine;