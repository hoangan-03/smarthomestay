import mqtt from "mqtt";
const AIO_USERNAME = 'quoc_huy';
const AIO_KEY = 'aio_Yigh26h3G0yetLlC0WmfuqHUrtbd';
const brokerUrl = "mqtts://io.adafruit.com";
const client = mqtt.connect(brokerUrl, {
  username: AIO_USERNAME,
  password: AIO_KEY
});

export default client;
