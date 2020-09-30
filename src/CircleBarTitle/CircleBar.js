import React, { Component } from 'react';
import CirleBar from './Pie';
import { scaleBand, scaleRadial} from 'd3-scale'


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

        let width = 400 - margins.left - margins.right
        let height = 400 - margins.top - margins.bottom
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
            <h3>Cases by Country</h3>
            <svg  width={width+ margins.left + margins.right} height={height + margins.top + margins.bottom} >
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