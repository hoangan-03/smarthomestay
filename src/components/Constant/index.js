import tempicon from "../../assets/icons/Temperature icon.png"
import lightbulp from "../../assets/icons/lightbulp.png";
import lightlevelicon from "../../assets/icons/Light icon.png"
import humidityicon from "../../assets/icons/humidityicon.png";
import lightbulb_dark from '../../assets/icons/lightbulb_dark.png'
import humid_dark from '../../assets/icons/humid_dark.png'
import temperature_dark from '../../assets/icons/temperature_dark.png'

const data = {
    temperature: {
        text: "Temperature",
        mockFigure: "31 oC",
        iconUrl: tempicon
    },
    humidity: {
        text: "Humidity",
        mockFigure: "1",
        iconUrl: humidityicon 
    },
    lightlevel: {
        text: "Light Level",
        mockFigure: "70/100",
        iconUrl: lightbulp 
    }
};


export default data;


