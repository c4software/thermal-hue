# Thermal-Hue Docker image
# VERSION               0.0.1

FROM  python:3
MAINTAINER Valentin Brosseau "c4software@gmail.com"

WORKDIR /usr/src/app
COPY . .

CMD [ "python", "./main.py" ]