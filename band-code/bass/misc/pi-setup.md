# Setting up a blank Pi

1. Install Raspbian Stretch
2. create `ssh` file on boot partition
3. create `wpa_supplicant.conf` (see template below)
4. ssh into `pi@raspberrypi.local`
5. `passwd`
6. `sudo apt-get update && sudo apt-get upgrade`
7. `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -`
8. `sudo apt-get install -y nodejs`
9. `sudo apt-get install libasound2-dev git`
10. `git clone https://github.com/nodebotanist/dotJS-2019.git`
11. `cd dotJS-2019/band-code/bass`
12. `npm i`
13. `sudo nano /etc/systemd/system/basslights.service` (see template below)
14. `sudo systemctl start basslights`
15. `sudo systemctl enable basslights`
16. `sudo raspi-config`, change network name to `nodebotanist-rpi-bass`
17. reboot on request

### wpa_supplicant.conf

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="Cloudflare-Guest"
    psk=""
    id_str="work"
}

network={
    ssid="Megaton"
    psk=""
    id_str="home"
}

network={
    ssid="Nodebotanist"
    psk=""
    id_str="travel"
}
```

### basslights.service

```
[Unit]
Description=Turns on the bass lights
After=network.target

[Service]
ExecStart=/usr/bin/node /home/pi/dotJS-2019/band-code/bass/index.js
WorkingDirectory=/home/pi/dotJS-2019/band-code/bass
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
