import React, { Component } from 'react';
import * as d3 from 'd3';
import { svg } from 'd3';

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
    let {
      value,
      label,
      fill,
      innerRadius,
      outerRadius,
      cornerRadius,
      startAngle,
      padAngle,
      endAngle,
      data,
      padradius,
      ...props
    } = this.props;
    if (this.state.isHovered) {
      outerRadius *= 1.15;
     
    }
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .padAngle(padAngle)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padRadius(innerRadius)
      .cornerRadius(cornerRadius)
   
    return (
      <g {...props} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        
        <path d={arc(value)} fill={"#5371f9"} />
      
      </g>
    );
  }
}

export default Slice;