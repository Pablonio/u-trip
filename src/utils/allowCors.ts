import { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = [
  'https://www.u-trip.online',
  'https://u-trip-git-models-pablonios-projects.vercel.app',
  'https://u-trip-pablonios-projects.vercel.app'
];

export function allowCors(fn: (req: NextApiRequest, res: NextApiResponse) => void) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const origin = req.headers.origin as string;

    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Content-Type, Authorization');

    
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      res.status(200).end();
      return;
    }

    
    if (req.method === 'GET' || req.method === 'PATCH' || req.method === 'POST') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    }

    
    if (req.method === 'DELETE') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    }

    
    return await fn(req, res);
  };
}
