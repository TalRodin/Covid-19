import React, { Component } from 'react';
import * as d3 from 'd3';
class Slice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({ isHovered: true });
  }

  onMouseOut() {
    this.setState({ isHovered: false });
  }




  render() {
    // const tooltipStyle = {
    //   display: this.state.isHovered ? 'block' : 'none'
    // }
    console.log(this.props)
    let {
      value,
      label,
      fill,
      innerRadius = 0,
      outerRadius,
      cornerRadius,
      padAngle,
      ...props
    } = this.props;
  
    // if (this.state.isHovered) {
    //   outerRadius *= 1.05;
     
    // }
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .padAngle(padAngle);

    let outerArc= d3.arc()
    .innerRadius(innerRadius*1.5)
    .outerRadius(outerRadius*1.4)

    function points(value){
      let posA = arc.centroid(value)
      let posB = outerArc.centroid(value)
      let posC = outerArc.centroid(value)
      let midangle = value.startAngle + (value.endAngle - value.startAngle)
      console.log(midangle)
      posC[0] = outerRadius * 0.99 * (midangle < 6 ? 1.3 : -1.3)
      return [posA, posB, posC]
    }
    function position(value){
      let pos = outerArc.centroid(value);
      let midangle = value.startAngle + (value.endAngle - value.startAngle)
      pos[0] = outerRadius * 0.99 * (midangle < 6 ? 1.35 : -1.7);
      return pos
}

    return (
      // onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
      <g  {...props} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <path d={arc(this.props.value)} fill={fill} />
        {/* <text
          transform={`translate(${arc.centroid(this.props.value)})`}
          dy=".35em"
          textAnchor="middle"
          fill="black"
          font-size="10px"
        >
          {this.props.label}
        </text> */}
        {/* <path d={outerArc(this.props.value)} /> */}
        <polyline 
        stroke="#4b4a5e"
        fill= "None"
        stroke-width="1"
        points={
          points(this.props.value)
        }
        />
         <text
      //    transform={function(value) {
      //     var pos = outerArc.centroid(value);
      //     var midangle = value.startAngle + (value.endAngle - value.startAngle) / 2
      //     pos[0] = outerRadius * 0.99 * (midangle < Math.PI ? 0.5 : -0.5);
      //     return 'translate(' + pos + ')';
      // }}
         transform={`translate(${position(value)})`}
        //  transform={`translate(${outerArc.centroid(this.props.value)})`}
         
        textAnchor={function(value) {
          let midangle = value.startAngle + (value.endAngle - value.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
      }}
      font-size="18px"
      fill= "#4b4a5e"
         >
         {this.props.label}
         </text>
      </g>
    );
  }
}

export default Slice;
