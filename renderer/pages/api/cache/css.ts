import { fetchCSS } from '@m2vi/iva';
import type { NextApiRequest, NextApiResponse } from 'next';
import cache from 'memory-cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cache.get('external-css')) {
    return res.end(cache.get('external-css'));
  }

  const css = await fetchCSS([
    'https://dev.core.fluxi.ml/styles/animations.css',
    'https://dev.core.fluxi.ml/styles/colors.css',
    'https://dev.core.fluxi.ml/styles/components.css',
    'https://dev.core.fluxi.ml/styles/globals.css',
  ]);

  cache.put('external-css', css, 1000 * 60 * 60 * 6);

  res.send(css);
}
