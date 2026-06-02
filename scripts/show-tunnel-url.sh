#!/usr/bin/env bash
# Print the current trycloudflare.com URL from the Docker tunnel container.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! docker ps --format '{{.Names}}' | grep -q '^wardrobe-tunnel$'; then
  echo "Tunnel container not running. Start stack:"
  echo "  docker compose -f docker-compose.yaml up -d"
  exit 1
fi

URL=$(docker logs wardrobe-tunnel 2>&1 | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | tail -1)

if [ -z "$URL" ]; then
  echo "URL not ready yet. Wait 15s and run again, or:"
  echo "  docker logs -f wardrobe-tunnel"
  exit 1
fi

echo "$URL" >"$ROOT/cloudflared-url.txt"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$URL/" || echo "000")

echo "Public URL: $URL"
echo "HTTP check: $HTTP"
echo "Saved to: cloudflared-url.txt"

if [ "$HTTP" != "200" ]; then
  echo "Warning: site not returning 200 yet — wait a few seconds and retry."
  exit 1
fi
