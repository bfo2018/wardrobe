#!/usr/bin/env bash
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

docker compose -f docker-compose.yaml stop cloudflared 2>/dev/null || true
pkill -f "cloudflared tunnel" 2>/dev/null || true
rm -f "$ROOT/cloudflared-url.txt"
echo "Cloudflare tunnel stopped. App still on http://localhost:9002"
