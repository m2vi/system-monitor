import type { NextApiRequest, NextApiResponse } from 'next';
import cache from 'memory-cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cache.clear();
  res.status(200).json(true);
}
