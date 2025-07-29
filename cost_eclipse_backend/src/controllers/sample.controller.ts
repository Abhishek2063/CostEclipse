import { Request, Response } from 'express';

export const helloWorld = (_req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript + PostgreSQL' });
};
