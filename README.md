# DUS Website

SvelteKit website with a same-repo Sanity Studio.

## Setup

Use the Node version in `.nvmrc`:

```sh
nvm use
npm install
```

Copy `.env.example` to `.env` for local Sanity-backed development:

```sh
PUBLIC_SANITY_PROJECT_ID=saoj8gx9
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-06-01
SANITY_STUDIO_PROJECT_ID=saoj8gx9
SANITY_STUDIO_DATASET=production
```

## Developing

```sh
npm run dev
```

Run Sanity Studio locally:

```sh
npm run studio:dev
```

## Building

```sh
npm run check
npm run build
```

You can preview the production build with `npm run preview`.

## Vercel

This project uses `@sveltejs/adapter-vercel` and the local Vercel CLI.

Link this checkout to the existing Vercel project:

```sh
npm run vercel:pull
```

Run the Vercel dev server:

```sh
npm run vercel:dev
```

Deploy a preview:

```sh
npm run deploy:preview
```

Deploy production:

```sh
npm run deploy:prod
```

Set these environment variables in Vercel for preview and production:

```sh
PUBLIC_SANITY_PROJECT_ID=saoj8gx9
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-06-01
```
