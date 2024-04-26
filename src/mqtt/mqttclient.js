import mqtt from "mqtt";
const AIO_USERNAME = process.env.ADAIO_USERNAME;
const brokerUrl = process.env.BROKER_URL;
const AIO_KEY = process.env.ADAIO_KEY;
const client = mqtt.connect(brokerUrl, {
  username: AIO_USERNAME,
  password: AIO_KEY
});

export default client;
