# thermal-hue

Use your Hue Sensor as a thermal sensor.

## Quick use

First allow the script to use your Bridge.
```
$ python3 main.py --initbridge
Press the Bridge button, then press Return.
You can edit the settings.py and set the BRIDGE_USERMAME to 'You-Token'
$ vim settings.py
```

Now the srcipt should output the current temperature.
```
$ python3 main.py
23.05
```
