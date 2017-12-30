import argparse
from tools.bridge import init_bridge, get_temp,find_bridge
import json
import logging
from settings import BRIDGE_IP

parser = argparse.ArgumentParser()
parser.add_argument("--debug", action="store_true", help="Display debug info (lastupdated information).")
parser.add_argument("--bridge", default=0, help="Index number of your bridge (default 0, the first bridge of your network)")
parser.add_argument("--initbridge", action="store_true", help="Init the communication with de Hue Bridge.")

parser.add_argument("--correction", default=0, type=float, help="Temperature correction")

# Overide settings.py
parser.add_argument("--ip", default=None ,help="Ip of the bridge.")
args = parser.parse_args()

if args.ip:
    BRIDGE_IP = args.ip
if not BRIDGE_IP:
    BRIDGE_IP = find_bridge(args.bridge)

if not BRIDGE_IP:
    print("No bridge found on your network. Try to set the 'BRIDGE_IP' value in the settings.py")
    exit()

if args.initbridge:
    init_bridge(BRIDGE_IP=BRIDGE_IP)
    exit()

if args.debug:
    logging.basicConfig(level=logging.DEBUG)

temperature = get_temp(BRIDGE_IP=BRIDGE_IP)
if temperature:
    temperature = (temperature / 100) + args.correction
    print (temperature)
else:
    print("No sensor found")
