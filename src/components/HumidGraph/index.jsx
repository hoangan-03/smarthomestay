import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HumidGraph extends Component {


  render() {

    const { realtimedata, toggleDarkMode } = this.props;
    console.log("hhh", realtimedata);

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
    let td = graphdata.temperature.dataPoints
    console.log("humid_measure", humidMeasures);
    console.log("humid_measure_mock", td);
    let humid = graphdata.humidity;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
      title: {
        text: humid.text
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: humid.title,
        valueFormatString: humid.format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        }
      },
      data: [{
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: humid.format,
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

export default HumidGraph;
