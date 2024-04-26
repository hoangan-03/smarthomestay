import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TempGraph extends Component {


  render() {

    const { realtimedata, toggleDarkMode } = this.props;

    let humidMeasures;
    if (realtimedata) {
      realtimedata.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

      humidMeasures = realtimedata.map(item => {
        let date = new Date(item.timestamp);
        console.log("date", date);

        return {
          x: date,
          y: parseFloat(item.value.toString().slice(0, -1))
        };
      });
    }
    let temperature = graphdata.temperature;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
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
        dataPoints: humidMeasures,
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
