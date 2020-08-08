#!/bin/bash

# Update package manager
sudo apt update

# Set up nginx
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Update firewall
sudo ufw allow 'Nginx HTTPS'

# Configure nginx
sudo cp ../nginx/raiseit.lenpaul.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/raiseit.lenpaul.com /etc/nginx/sites-enabled/

# Set up Let's Encrypt
# sudo add-apt-repository ppa:certbot/certbot
# sudo apt install python-certbot-nginx
