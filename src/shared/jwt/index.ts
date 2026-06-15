import 'dotenv/config';

import jwt, { type SignOptions } from 'jsonwebtoken';

export const signJwt = <T extends string | object | Buffer<ArrayBufferLike>>(
  payload: T,
): string => {
  const secret = process.env.JWT_KEY;
  const expiresIn = process.env.JWT_EXPIRES as SignOptions['expiresIn'];

  if (!secret || !expiresIn) {
    throw new Error('JWT env missing');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyJwt = <T extends object>(
  token: string,
): jwt.JwtPayload & T => {
  const secret = process.env.JWT_KEY;

  if (!secret) {
    throw new Error('JWT env missing');
  }

  return jwt.verify(token, secret) as jwt.JwtPayload & T;
};
