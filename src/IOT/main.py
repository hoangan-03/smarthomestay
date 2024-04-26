import sys
from Adafruit_IO import MQTTClient
import time
from dotenv import load_dotenv

load_dotenv()
AIO_FEED_ID = ["light_switch"]
AIO_USERNAME = 'quoc_huy'
AIO_KEY = 'aio_rMVP67l6v6exeq2nE9aCwJlQecmr'


def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_ID:
        client.subscribe(topic)


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong ...")


def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload + ",feed id: " + feed_id)


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


count = 10
while True:
    if (count <= 0):
        print("Publish light_switch")
        client.publish("light_switch", 0)
        count = 10
    count -= 1
    time.sleep(1)