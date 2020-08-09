#!/bin/bash

# Update package manager
sudo apt update

# Set up nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Update firewall
sudo ufw allow 'Nginx HTTPS'

# Configure nginx
sudo cp ../nginx/raiseit.lenpaul.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/raiseit.lenpaul.com /etc/nginx/sites-enabled/

# To avoid a possible hash bucket memory problem that can arise from adding additional server names
sudo sed -i 's/# server_names_hash_bucket_size 64;/server_names_hash_bucket_size 64;/g' /etc/nginx/nginx.conf
sudo systemctl restart nginx

# Set up Let's Encrypt
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Configure the certificate (nginx already configured to read certificate file)
sudo certbot --nginx
