import argparse
from tools.bridge import init_bridge, get_temp
import json

parser = argparse.ArgumentParser()
parser.add_argument("--initbridge", action="store_true", help="Init the communication with de Hue Bridge.")
args = parser.parse_args()

if args.initbridge:
    init_bridge()
    exit()

print (get_temp() / 100)
