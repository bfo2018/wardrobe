#!/usr/bin/env bash
# Start Docker stack (app + Cloudflare tunnel) and print public URL.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Starting Wardrobe (Docker) + Cloudflare tunnel..."
docker compose -f docker-compose.yaml up -d wardrobe-web cloudflared

echo "Waiting for tunnel URL (up to 30s)..."
for _ in $(seq 1 30); do
  if bash "$ROOT/scripts/show-tunnel-url.sh" 2>/dev/null; then
    echo ""
    echo "Keep Docker running. URL changes if you recreate the tunnel container."
    exit 0
  fi
  sleep 1
done

echo "Tunnel still starting. Run:"
echo "  ./scripts/show-tunnel-url.sh"
echo "  docker logs -f wardrobe-tunnel"
exit 1
