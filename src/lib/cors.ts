import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export async function cors(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: () => Promise<void>
) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['https://www.u-trip.online', 'https://u-trip-pablonios-projects.vercel.app'],
    optionsSuccessStatus: 200,
  });

  await callback();
}