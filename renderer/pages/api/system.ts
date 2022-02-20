import type { NextApiRequest, NextApiResponse } from 'next';
import system from '../../utils/system';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await system.get());
}
