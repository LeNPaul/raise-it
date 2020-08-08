#!/bin/bash

# Set up user for running application
sudo adduser raiseit
sudo usermod -aG sudo raiseit
sudo ufw allow OpenSSH
sudo ufw enable

# Update package manager
sudo apt update

# Set up Git
sudo apt install -y git

# Set up MongoDB
sudo apt install -y mongodb

# Set up Node.js
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install -y nodejs
sudo apt install -y npm

# Set up PM2
sudo npm install pm2@latest -g

# Pull code from GitHub
#cd ~
#git clone https://github.com/LeNPaul/raise-it.git
#cd raise-it
#npm install

#pm2 start bin/www
