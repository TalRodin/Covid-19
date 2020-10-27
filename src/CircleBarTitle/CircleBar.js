import React, { Component } from 'react';
import CirleBar from './Pie';
import { scaleBand, scaleRadial} from 'd3-scale'
import './CircleBar.css'

// {countries}
class Circle extends Component {
  constructor(props) {
    super(props)
    this.xScale = scaleBand()
    this.yScale = scaleRadial()
  
  }
    render() {
        let arr=[]
        
        this.props.countries.map((country)=>{
          arr.push({name:country.country, value:country.cases/350})
        })
        let data=arr.slice(0,50)
        console.log('-----------',data)
        
        const margins = {top: 100, right: 0, bottom: 0, left: 0}

        let width = 580;
        let height = Math.min(width, 500);
        let innerRadius = 100
        let outerRadius = Math.min(width, height) / 2
        // let radius = Math.min(width, height)/2 ;
        let x = width/2;
        let y = height/2;

        const xScale = this.xScale
            .align(0) 
            .domain( data.map(d => d.name))
            .range([0, 2 * Math.PI])

        const yScale = this.yScale
            .range([innerRadius, outerRadius])
            .domain([0, 10000])
        
        return (
          <div>
            <h3 className='circle'>Cases by Country</h3>
            <svg width='1000' height='800' viewBox="0 -100 600 800" >
              <CirleBar
                width={width}
                height={height}
                scales={{ xScale, yScale }}
                innerRadius={innerRadius}
                margins={margins}
                // outerRadius={data.map(d => d.value)}
                cornerRadius={3}
                padAngle={0.01}
                // startAngle={data.map(d => d.name)}
                padRadius={innerRadius}
                // endAngle={data.map(d=>xScale(d.name) + xScale.bandwidth())}
                data={data} />
            </svg>
          </div> 
        );
      }
}
export default Circle;