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
      realtimedata.sort(
        (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
      );
      humidMeasures = realtimedata
        .reverse()
        .slice(0, 10)
        .map((item) => {
          let date = new Date(item.timestamp);
          date.setHours(date.getHours() - 7);
          return {
            x: date,
            y: parseFloat(item.value.toString()),
          };
        });
    }
    console.log("humid_measure", humidMeasures);
    let humid = graphdata.humidity;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
      title: {
        text: humid.text
      },
      axisX: {
        valueFormatString: "HH:mm",
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
        xValueFormatString: "HH:mm",
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
