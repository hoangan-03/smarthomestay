import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LightGraph extends Component {

  render() {
    const { realtimedata, toggleDarkMode } = this.props;

    let lightMeasures;
    if (realtimedata) {
      realtimedata.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

      lightMeasures = realtimedata.map(item => {
        let date = new Date(item.Timestamp);

        return {
          x: date,
          y: item.Light_measure
        };
      });
    }

    let light = graphdata.lightlevel;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
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
