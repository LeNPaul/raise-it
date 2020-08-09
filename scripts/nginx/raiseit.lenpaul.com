server {

    listen 80;

    server_name raiseit.lenpaul.com;

    location / {
        proxy_pass http://localhost:9090;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    #listen 443 ssl;
    #ssl_certificate /etc/letsencrypt/live/raiseit.lenpaul.com/fullchain.pem; # managed by Certbot
    #ssl_certificate_key /etc/letsencrypt/live/raiseit.lenpaul.com/privkey.pem; # managed by Certbot

    #include /etc/letsencrypt/options-ssl-nginx.conf;
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    #if ($scheme != "https") {
    #    return 301 https://$host$request_uri;
    #}

}
