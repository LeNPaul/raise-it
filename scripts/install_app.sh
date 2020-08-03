#!/bin/bash
sudo adduser raiseit
sudo usermod -aG sudo raiseit
sudo ufw allow OpenSSH
sudo ufw enable
