## help               - Show this help.
.PHONY: help
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

DOMAIN = localhost
EMAIL = contact@localhost
WEBROOT = /var/www/$(DOMAIN)
# SSH target for publish, e.g. root@yanct.com
HOST =


## build              - Build web page
.PHONY: build
build: 
	npm install
	npm run build

## preview            - Install, build and start up preview on http://localhost:4173/
.PHONY: preview
preview: build
	npm run preview

## publish            - Build locally and rsync dist/ to $(WEBROOT) on $(HOST)
.PHONY: publish
publish: build
	@test -n "$(HOST)" -a "$(DOMAIN)" != localhost || { echo "Usage: make publish HOST=user@server DOMAIN=example.com"; exit 1; }
	rsync -avz --delete dist/ $(HOST):$(WEBROOT)/

## setup              - Install npm, nginx, and certbot on Ubuntu/Debian
.PHONY: setup
setup:
	sudo apt update
	sudo apt install -y npm nginx certbot python3-certbot-nginx make

## configure-nginx    - Configure Nginx for $(DOMAIN) and serve the website
.PHONY: configure-nginx
configure-nginx:
	# Call the script to configure Nginx
	./configure-nginx.sh $(DOMAIN) $(WEBROOT)

## obtain-ssl         - Get a Let's Encrypt certificate for $(DOMAIN) and www, then turn on HTTPS (needs EMAIL=)
# certonly leaves the nginx config alone; configure-nginx.sh writes the HTTPS blocks once the
# certificate exists, so configure-nginx can be re-run without losing anything.
.PHONY: obtain-ssl
obtain-ssl:
	@test "$(DOMAIN)" != localhost -a "$(EMAIL)" != contact@localhost || { echo "Usage: make obtain-ssl DOMAIN=example.com EMAIL=you@example.com"; exit 1; }
	sudo certbot certonly --nginx -d $(DOMAIN) -d www.$(DOMAIN) --agree-tos --no-eff-email --email $(EMAIL) \
		--deploy-hook "systemctl reload nginx"
	./configure-nginx.sh $(DOMAIN) $(WEBROOT)

## renew-ssl          - Renew the SSL certificate for $(DOMAIN)
.PHONY: renew-ssl
renew-ssl:
	sudo certbot renew
	sudo systemctl reload nginx

## deploy             - Build and deploy the website, set up Nginx
.PHONY: deploy
deploy: setup build configure-nginx

## all                - Run everything (build, deploy, configure)
.PHONY: all
all: deploy
