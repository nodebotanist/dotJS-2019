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
9. `git clone git://github.com/scanlime/fadecandy`
9. `cd fadecandy/server`
9. `make submodules`
9. `make`
9. `sudo mv fcserver /usr/local/bin`
9. add the following line to `/etc/rc.local` above the final `exit 0` line: `/usr/local/bin/fcserver /usr/local/bin/fcserver.json >/var/log/fcserver.log 2>&1 &`
9. `sudo nano /usr/local/bin/fcserver.json` (see template below)
9. `sudo reboot`
9. ssh back in
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
    psk="#savetheinternet"
    id_str="work"
}

network={
    ssid="Megaton"
    psk="Thepowerofatom!"
    id_str="home"
}

network={
    ssid="Nodebotanist"
    psk=""
    id_str="travel"
}
```

### fcserver.json

```
{
  "listen": [null, 7890],
  "verbose": true,
 
  "color": {
    "gamma": 2.5,
    "whitepoint": [1.0, 1.0, 1.0],
    "linearCutoff": 0.0078125
  },
 
  "devices": [
    {
      "type": "fadecandy",
      "serial": "MYVDBPZJXNICGMJV",
      "map": [
        [ 0,    0,   0, 24 ],
        [ 0,   24,  64, 64 ],
        [ 0,   88,  128, 15 ]
      ]
    }
  ]
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
