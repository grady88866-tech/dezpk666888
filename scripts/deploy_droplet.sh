#!/usr/bin/env bash
set -euo pipefail

# Usage:
# DOMAIN=example.com GHCR_USER=youruser GHCR_PAT=ghp_xxx ./deploy_droplet.sh

DOMAIN=${DOMAIN:-}
GHCR_USER=${GHCR_USER:-}
GHCR_PAT=${GHCR_PAT:-}
REPO_URL=${REPO_URL:-https://github.com/grady88866-tech/dezpk666888.git}
APP_DIR=/opt/dezpk666888

if [ -z "$DOMAIN" ]; then
  echo "Please set DOMAIN env var, e.g.: DOMAIN=example.com $0"
  exit 1
fi

echo "Updating system and installing prerequisites..."
sudo apt-get update
sudo apt-get install -y git curl apt-transport-https ca-certificates lsb-release gnupg

echo "Installing Docker Engine..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER || true

echo "Installing docker compose plugin..."
sudo apt-get install -y docker-compose-plugin

echo "Installing nginx and certbot..."
sudo apt-get install -y nginx certbot python3-certbot-nginx

echo "Cloning repository to $APP_DIR..."
sudo rm -rf "$APP_DIR"
sudo git clone "$REPO_URL" "$APP_DIR"
sudo chown -R $USER:$USER "$APP_DIR"

cd "$APP_DIR"

if [ -n "$GHCR_USER" ] && [ -n "$GHCR_PAT" ]; then
  echo "Logging into GHCR..."
  echo "$GHCR_PAT" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

echo "Pulling images from GHCR..."
docker pull ghcr.io/grady88866-tech/dezpk666888-backend:latest || true
docker pull ghcr.io/grady88866-tech/dezpk666888-frontend:latest || true

echo "Starting application with docker compose..."
sudo docker compose -f docker-compose.prod.yml up -d

NGINX_CONF=/etc/nginx/sites-available/dezpk666888
NGINX_LINK=/etc/nginx/sites-enabled/dezpk666888

echo "Writing nginx config for domain $DOMAIN..."
sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
    }
}
EOF

sudo ln -sf $NGINX_CONF $NGINX_LINK
sudo nginx -t
sudo systemctl reload nginx

echo "Requesting Let's Encrypt certificate (certbot)..."
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m admin@${DOMAIN} || true

echo "Deployment complete. Visit https://$DOMAIN once DNS points to this droplet IP."
