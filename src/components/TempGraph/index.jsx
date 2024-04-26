import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TempGraph extends Component {

  

  render() {
    
    const { realtimedata, toggleDarkMode } = this.props;

    let tempMeasures;
    if (realtimedata) {
      realtimedata.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

      tempMeasures = realtimedata.map(item => {
        let date = new Date(item.Timestamp);

        return {
          x: date,
          y: item.Temp_measure
        };
      });
    }
    console.log("ddf", tempMeasures);
    let temp = graphdata.temperature;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
      title: {
        text: temp.text
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: temp.title,
        valueFormatString: temp.format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        }
      },
      data: [{
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: temp.format,
        // dataPoints: tempMeasures,
        dataPoints: temp.dataPoints
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
