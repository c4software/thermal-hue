# thermal-hue

Use your Hue Motion Sensor as thermal sensor.

## Quick use

First allow the script to use your Bridge.
```
$ python3 main.py --initbridge
Press the Bridge button, then press Return.
You can edit the settings.py and set the BRIDGE_USERMAME to 'Your-Token'
$ vim settings.py
```

Now the srcipt should output the current temperature.
```
$ python3 main.py
23.05
```

## Sample results

![sample](screenshot/capture.png)
