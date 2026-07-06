Deploy scripts

deploy_droplet.sh - droplet bootstrap script. Usage example:

DOMAIN=example.com GHCR_USER=youruser GHCR_PAT=token ./deploy_droplet.sh

Notes:
- Script installs Docker, docker compose, nginx and certbot, clones repo to /opt/dezpk666888,
  pulls images from GHCR (if available) and runs `docker compose -f docker-compose.prod.yml up -d`.
- The script configures nginx to proxy to local containers and requests a Let's Encrypt certificate.
