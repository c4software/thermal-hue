import argparse
from tools.bridge import init_bridge, get_temp
import json
import logging

parser = argparse.ArgumentParser()
parser.add_argument("--debug", action="store_true", help="Display debug info (lastupdated information).")
parser.add_argument("--initbridge", action="store_true", help="Init the communication with de Hue Bridge.")
args = parser.parse_args()

if args.initbridge:
    init_bridge()
    exit()

if args.debug:
    logging.basicConfig(level=logging.DEBUG)

print (get_temp() / 100)
