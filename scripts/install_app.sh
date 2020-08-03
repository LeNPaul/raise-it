#!/bin/bash

# Set up user for running application
sudo adduser raiseit
sudo usermod -aG sudo raiseit
sudo ufw allow OpenSSH
sudo ufw enable

# Set up MongoDB
sudo apt update
sudo apt install -y mongodb
