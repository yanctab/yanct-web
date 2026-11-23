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

# HTTPS is only configured once a certificate exists (make obtain-ssl gets one and re-runs this
# script). Until then the site is served over plain HTTP, so nginx starts on a brand-new domain.
CERT_DIR="/etc/letsencrypt/live/$DOMAIN"
if sudo test -f "$CERT_DIR/fullchain.pem"; then
    HAS_CERT=1
else
    HAS_CERT=
    echo "No certificate in $CERT_DIR yet; configuring HTTP only. Run 'make obtain-ssl DOMAIN=$DOMAIN EMAIL=...' to add HTTPS."
fi

# What the site serves, shared by the HTTP and HTTPS server blocks
SITE=$(cat <<EOL
    root $WEBROOT;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Serve the app for unknown paths so it renders its kernel-panic page, keeping the 404 status
    error_page 404 /index.html;
EOL
)

# Create the Nginx configuration file
CONFIG_FILE="/etc/nginx/sites-available/$DOMAIN"
if [ -n "$HAS_CERT" ]; then
    sudo tee "$CONFIG_FILE" > /dev/null <<EOL
# Send all plain HTTP to https://$DOMAIN. The redirect sits in a location rather than at server
# level so the challenge location certbot adds while renewing still gets to answer.
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        return 301 https://$DOMAIN\$request_uri;
    }
}

# Redirect www to non-www over HTTPS
server {
    listen 443 ssl;
    server_name www.$DOMAIN;

    ssl_certificate $CERT_DIR/fullchain.pem;
    ssl_certificate_key $CERT_DIR/privkey.pem;

    return 301 https://$DOMAIN\$request_uri;
}

# Main server block for HTTPS
server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate $CERT_DIR/fullchain.pem;
    ssl_certificate_key $CERT_DIR/privkey.pem;

$SITE
}
EOL
else
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

$SITE
}
EOL
fi

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

if [ -n "$HAS_CERT" ]; then
    echo "Nginx configured for https://$DOMAIN (HTTP and www redirect there) and site deployed."
else
    echo "Nginx configured for http://$DOMAIN (with www redirect) and site deployed."
fi
