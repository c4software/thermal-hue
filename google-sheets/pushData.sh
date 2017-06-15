#!/bin/bash

TEMP=`python3 /home/vbrosseau/thermal-hue/main.py`
curl -L "https://script.google.com/macros/s/REPLACE-BY-YOUR-SPREADSHEET-ID/exec?pushData='`date +%Y-%m-%d:%H:%M:%S`,$TEMP'"
