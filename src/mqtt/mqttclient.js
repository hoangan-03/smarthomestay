import mqtt from "mqtt";

const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;
const AIO_KEY = process.env.REACT_APP_AIO_KEY;
const brokerUrl = process.env.REACT_APP_BROKER_URL;

const client = mqtt.connect(brokerUrl, {
  username: AIO_USERNAME,
  password: AIO_KEY
});

export default client;