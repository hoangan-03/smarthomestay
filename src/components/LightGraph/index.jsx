import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import graphdata from "../GraphData";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LightGraph extends Component {
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
    let lightlevel = graphdata.lightlevel;
    const options = {
      animationEnabled: true,
      theme: !toggleDarkMode ? "light2" : "dark2",
      title: {
        text: lightlevel.text,
      },
      axisX: {
        valueFormatString: "HH:mm",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        title: lightlevel.title,
        valueFormatString: lightlevel.format,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      data: [
        {
          type: "area",
          xValueFormatString: "HH:mm",
          yValueFormatString: lightlevel.format,
          dataPoints: humidMeasures,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
export default LightGraph;
