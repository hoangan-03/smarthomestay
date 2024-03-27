import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TempGraph extends Component {

  render() {
    let temperature = graphdata.temperature;
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: temperature.text
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: temperature.title,
        valueFormatString: temperature.format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        }
      },
      data: [{
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: temperature.format,
        dataPoints: temperature.dataPoints,
      }]
    }

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default TempGraph;
