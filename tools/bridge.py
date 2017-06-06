from socket import getfqdn
from settings import BRIDGE_IP, BRIDGE_USERMAME
from .rest import callrest
import json
import logging

def _api_path():
    if BRIDGE_USERMAME is "":
        return "/api"
    else:
        return "/api/{}".format(BRIDGE_USERMAME)

def init_bridge():
    try:
        input("Press the Bridge button, then press Return")
        fq_device_type = "thermal-hue@{}".format(getfqdn())
        ret = callrest(domain=BRIDGE_IP, port=80, type="POST", params={"devicetype": fq_device_type})
        ret = json.loads(ret[2])
        if "success" in ret:
            print ("You can edit the settings.py and set the BRIDGE_USERMAME to '{0}'".format(ret["success"]["username"]))
        else:
            print ("Link button not pressed")
    except Exception as e:
        print ("Link button not pressed")


def get_temp():

    if BRIDGE_USERMAME is "":
        print ("BRIDGE_USERMAME is required. To use this script please run 'python3 main.py --initbridge' and follow the instruction.")
        exit()

    ret = callrest(domain=BRIDGE_IP, path=_api_path() + "/sensors/")
    sensor = json.loads(ret[2])
    for s in sensor:
        ret = sensor[s]
        if ret["type"] == "ZLLTemperature":
            logging.debug("Last Updated : {}".format(ret["state"]["lastupdated"]))
            return ret['state']['temperature']
