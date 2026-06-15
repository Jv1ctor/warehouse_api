import type { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; name: string };
    }
  }
}

declare module 'express' {
  export interface Request extends ExpressRequest {
    user?: { id: number; name: string };
  }
}

export type AuthRequest = ExpressRequest & {
  user?: { id: number; name: string };
};
