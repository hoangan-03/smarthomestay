import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LightGraph extends Component {

  render() {
    const { realtimedata } = this.props;
    console.log("fdd", graphdata.lightlevel.dataPoints);
    let lightMeasures;
    if (realtimedata) {
      lightMeasures = realtimedata.map(item => {
        let date = new Date(item.Timestamp)

        return {
          x: date,
          y: item.Light_measure
        };
      });
    }
    let light = graphdata.lightlevel;
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: light.text
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: light.title,
        valueFormatString: light.format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        }
      },
      data: [{
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: light.format,
        dataPoints: lightMeasures,
      }]
    }

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default LightGraph;
