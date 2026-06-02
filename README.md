# Wardrobe — Premium Clothing Rentals

Luxury editorial website for a premium clothing rental business targeting weddings, parties, and high-end events in India.

**Tagline:** *RENT IT | BUY IT*

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Hook Form
- Google Fonts (Playfair Display + DM Sans)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.local.example` to `.env.local` and fill in your values:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n webhook URL for booking & contact submissions |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code (e.g. `919876543210`) |

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, collections, how it works, testimonials |
| `/collections` | Filterable product grid |
| `/collections/[slug]` | Product detail with gallery & booking |
| `/book` | Full booking form (n8n webhook) |
| `/about` | Brand story & values |
| `/contact` | Contact info, map, contact form |

## Booking Integration

All forms POST JSON to `NEXT_PUBLIC_N8N_WEBHOOK_URL` with a `type` field:

- `booking` — full booking page
- `modal` — quick booking drawer
- `contact` — contact page form

Example payload:

```json
{
  "type": "booking",
  "fullName": "Priya Sharma",
  "phone": "+919876543210",
  "email": "priya@example.com",
  "eventDate": "2026-12-15",
  "eventType": "Wedding",
  "outfitInterest": "Bridal Lehenga",
  "tryOn": "Home Visit",
  "message": "Looking for red/crimson tones",
  "submittedAt": "2026-06-01T12:00:00.000Z"
}
```

## Build

```bash
npm run build
npm start
```

## Docker (port 9002)

1. Ensure `.env.local` exists (see `.env.docker.example`).

2. Build and run:

   ```bash
   docker compose -f docker-compose.yaml up --build -d
   ```

3. Open [http://localhost:9002](http://localhost:9002)

**Useful commands:**

```bash
docker compose -f docker-compose.yaml logs -f wardrobe-web
docker compose -f docker-compose.yaml down
docker compose -f docker-compose.yaml up --build -d   # rebuild after code changes
```

`NEXT_PUBLIC_*` variables are baked in at **image build** time. After changing them, rebuild:

```bash
docker compose -f docker-compose.yaml build --no-cache && docker compose -f docker-compose.yaml up -d
```

## Share with clients (Cloudflare Tunnel)

The tunnel runs **inside Docker** next to the app (`restart: unless-stopped`) so it stays up with your stack.

```bash
chmod +x scripts/*.sh
./scripts/start-cloudflare-tunnel.sh
# or after stack is already up:
./scripts/show-tunnel-url.sh
```

Send the printed `https://….trycloudflare.com` link to your client.

**Error: “origin has been unregistered from Argo Tunnel”** — tunnel container stopped or URL is old:

```bash
docker compose -f docker-compose.yaml up -d wardrobe-web cloudflared
./scripts/show-tunnel-url.sh   # NEW url each time cloudflared container is recreated
```

**Note:** Quick tunnel URLs change when you recreate `wardrobe-tunnel`. Keep Docker Desktop running on your Mac.

For a permanent URL on your own domain, use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) with a named tunnel in the Cloudflare dashboard.

## Featured collection images

Place or replace home page grid images in:

`public/images/featured/`

See `public/images/featured/README.md` for the required filenames per caption.

## Brand Colors

- Charcoal: `#0f0f0f`
- Gold: `#c9a84c`
- Ivory: `#f5f0e8`
