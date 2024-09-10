import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import type { PageConfig } from 'next';
import { vValidator } from '@hono/valibot-validator';
import * as v from 'valibot';

export const config: PageConfig = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get(
  '/hello',
  vValidator(
    'query',
    v.object({
      a: v.string(),
    }),
  ),
  c =>
    c.json({
      message: 'Hello Next.js!',
    }),
);

export default handle(app);
