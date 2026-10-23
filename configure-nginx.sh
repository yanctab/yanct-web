#!/bin/bash

set -xe

# Ensure variables are passed in
DOMAIN=$1
WEBROOT=$2

# Check if the domain and webroot are provided
if [ -z "$DOMAIN" ] || [ -z "$WEBROOT" ]; then
    echo "Usage: $0 <domain> <webroot>"
    exit 1
fi

# Create the directory for the website if it doesn't exist
sudo mkdir -p "$WEBROOT"

# Copy the built website (assuming it's in a 'dist' directory)
sudo cp -r dist/* "$WEBROOT"

# Create the Nginx configuration file
CONFIG_FILE="/etc/nginx/sites-available/$DOMAIN"
sudo tee "$CONFIG_FILE" > /dev/null <<EOL
# Redirect www to non-www
server {
    listen 80;
    server_name www.$DOMAIN;
    return 301 http://$DOMAIN\$request_uri;
}

# Main server block for HTTP
server {
    listen 80;
    server_name $DOMAIN;

    root $WEBROOT;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Serve the app for unknown paths so it renders its kernel-panic page, keeping the 404 status
    error_page 404 /index.html;
}

# Main server block for HTTPS
server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    root $WEBROOT;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Serve the app for unknown paths so it renders its kernel-panic page, keeping the 404 status
    error_page 404 /index.html;
}
EOL

# Disable default site if it's still enabled
if [ -L /etc/nginx/sites-enabled/default ]; then
    echo "Disabling default Nginx site..."
    sudo rm /etc/nginx/sites-enabled/default
fi

# Enable the site configuration by creating a symlink in 'sites-enabled'
sudo ln -sf "$CONFIG_FILE" /etc/nginx/sites-enabled/

# Test the Nginx configuration for syntax errors
sudo nginx -t

# Reload Nginx to apply the new configuration
sudo systemctl reload nginx

echo "Nginx configured for $DOMAIN and www.$DOMAIN (with www redirect) and site deployed."