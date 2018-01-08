# Thermal hue

Use your Hue Motion Sensor as temperature sensor.

## Quick use

First allow the script to use your Bridge.

```sh
$ python3 main.py --initbridge
Press the Bridge button, then press Return.
You can edit the settings.py and set the BRIDGE_USERMAME to 'Your-Token'
$ vim settings.py
```

Now the script should output the current temperature.
```sh
$ python3 main.py
23.05
```

## Temperature correction

If the Motion sensor temperature is wrong you can "correct" the output value by adding the « --correction » parameter. For example :

```sh
$ python3 main.py
23.05
$ python3 main.py --correction "-0.5"
23
$ python3 main.py --correction "+1"
24.05
$ python3 main.py --correction "-1"
22.05
```

## Sample results

![sample](screenshot/capture.png)

## Use Google Spreadsheets as backend

You can save your data directly to Google Spreadsheets. The Google Script and the Bash script are [here](https://github.com/c4software/thermal-hue/tree/master/google-spreadsheets-backend), I also made a simple app to display temperature data directly to your mobile [Thermal Hue App](https://github.com/c4software/thermal-hue-app)
