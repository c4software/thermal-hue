import argparse
import sqlite3
from db import init_db

try:
    conn = sqlite3.connect('data.db')
except e as Exception:
    print ("Sqlite db can't be write")
    exit()

parser = argparse.ArgumentParser()
parser.add_argument("--stdin", action="store_true", help="Output the current temperature value to the stdin")
parser.add_argument("--init", action="store_true", help="Init the database")
args = parser.parse_args()

if args.init:
    init_db()
    exit()
