import mqtt from "mqtt";
const AIO_USERNAME = 'quoc_huy';
const AIO_KEY = 'aio_rMVP67l6v6exeq2nE9aCwJlQecmr';
const brokerUrl = "mqtt://io.adafruit.com";
const client = mqtt.connect(brokerUrl, {
  username: AIO_USERNAME,
  password: AIO_KEY
});

export default client;
