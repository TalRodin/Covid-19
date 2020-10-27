import React from 'react'
import {Radar} from 'react-chartjs-2';
import './RadarGraph.css'

const data = {
    labels: ['Cases', 'Recovered', 'Deaths', 'Critical'],
    datasets: [
      {
        label: 'India',
        borderWidth:'1',
        backgroundColor: 'rgba(255,123,137,0.2)',
        borderColor: 'rgba(255,123,137,1)',
        pointBackgroundColor: 'rgba(255,123,137,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,123,137,1)',
        data: [6073348, 5013367, 95574, 8944]
      },
      {
        label: 'USA',
        borderWidth:'1',
        backgroundColor: 'rgba(83,113,249,0.2)',
        borderColor: 'rgba(83,113,249,1)',
        pointBackgroundColor: 'rgba(83,113,249,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(83,113,249,1)',
        data: [7321343, 4560456, 209453, 14130]
      },
      {
        label: 'Brazil',
        borderWidth:'1',
        backgroundColor: 'rgba(104,193,157,0.2)',
        borderColor: 'rgba(104,193,157,1)',
        pointBackgroundColor: 'rgba(104,193,157,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(104,193,157,1)',
        data: [4732309, 4060088, 141776, 8318]
      }
    ]
  };

  


function RadarGraph({countries}) {
    console.log('========>>>>>',countries)
    let colors=['rgba(255,123,137,1)','rgba(83,113,249,1)','rgba(104,193,157,1)']
    let colors2=['rgba(255,123,137,0.2)','rgba(83,113,249,0.2)','rgba(104,193,157,0.2)']
    let arr=[]
    countries.map((v,i)=>{
      arr.push({
          label: `${v.country}`,
          borderWidth:'1',
          backgroundColor: colors2[i],
          borderColor: colors[i],
          pointBackgroundColor: colors[i],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors[i],
          data: [v.cases, v.recovered, v.deaths, v.critical]
      })
    })
    const data = {
      labels: ['Cases', 'Recovered', 'Deaths', 'Critical'],
      datasets: arr
      
      // [
      //   {
      //     label: 'India',
      //     borderWidth:'1',
      //     backgroundColor: 'rgba(255,123,137,0.2)',
      //     borderColor: 'rgba(255,123,137,1)',
      //     pointBackgroundColor: 'rgba(255,123,137,1)',
      //     pointBorderColor: '#fff',
      //     pointHoverBackgroundColor: '#fff',
      //     pointHoverBorderColor: 'rgba(255,123,137,1)',
      //     data: [6073348, 5013367, 95574, 8944]
      //   },
      //   {
      //     label: 'USA',
      //     borderWidth:'1',
      //     backgroundColor: 'rgba(83,113,249,0.2)',
      //     borderColor: 'rgba(83,113,249,1)',
      //     pointBackgroundColor: 'rgba(83,113,249,1)',
      //     pointBorderColor: '#fff',
      //     pointHoverBackgroundColor: '#fff',
      //     pointHoverBorderColor: 'rgba(83,113,249,1)',
      //     data: [7321343, 4560456, 209453, 14130]
      //   },
      //   {
      //     label: 'Brazil',
      //     borderWidth:'1',
      //     backgroundColor: 'rgba(104,193,157,0.2)',
      //     borderColor: 'rgba(104,193,157,1)',
      //     pointBackgroundColor: 'rgba(104,193,157,1)',
      //     pointBorderColor: '#fff',
      //     pointHoverBackgroundColor: '#fff',
      //     pointHoverBorderColor: 'rgba(104,193,157,1)',
      //     data: [4732309, 4060088, 141776, 8318]
      //   }
      // ]
    };
    return (
      <>
        <h3>Cases, Recovered, Deaths, Critical</h3>
        <div style={{height:'700px', width: '700px', margin:'10px', padding:'60px' }}>
             
             <Radar data={data} width={'500px'} height={'500px'} padding={'5px'}/>
       
        </div>
      </>
    )
}

export default RadarGraph
