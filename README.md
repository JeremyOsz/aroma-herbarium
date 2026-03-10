# Aromatherapy Herbarium

Vintage-inspired aromatherapy explorer built with Next.js, Tailwind, and shadcn.

## Run locally

```bash
npm install
npm run dev
```

## Amazon affiliate setup

Create `.env.local` in this app and set your Associate tag:

```bash
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=yourtag-20
```

- Ingredient cards will generate Amazon search links with your tag.
- If the env var is missing, links still work as normal search links but are not monetized.
- Keep the in-app affiliate disclosure visible for compliance.
