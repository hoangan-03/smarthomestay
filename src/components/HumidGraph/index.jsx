import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import graphdata from '../GraphData';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HumidGraph extends Component {

  
  render() {
    
    const { realtimedata } = this.props;

    let humidMeasures;
    if (realtimedata) {
      realtimedata.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

      humidMeasures = realtimedata.map(item => {
        let date = new Date(item.Timestamp);

        return {
          x: date,
          y: item.humid_measure
        };
      });
    }
    console.log("ddf", humidMeasures);
    let humid = graphdata.humidity;
    const options = {
      animationEnabled: true,
      theme: "light2",
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
        // dataPoints: humidMeasures,
        dataPoints: humid.dataPoints
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
