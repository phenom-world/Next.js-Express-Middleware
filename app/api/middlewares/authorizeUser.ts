import { User } from '@/types';

import { ErrorResponse, handleTokenError, isEmpty } from '../lib';
import { AuthorizeUser, AuthorizeRoles } from './types';
import { verifyToken } from '../lib/util';

export const protect: AuthorizeUser = async (req, _params, next) => {
  let token = '';
  const authorization = req.headers.get('authorization');
  const cookie = req.cookies.get('auth')?.value;
  if (!authorization && !cookie) {
    return ErrorResponse('You are not logged in. Please log in to get access', 401);
  }

  if (authorization && authorization.startsWith('Bearer')) token = authorization.split(' ')[1];
  if (cookie) token = cookie;

  try {
    // verify token
    const user = (await verifyToken(token, process.env.JWT_SECRET!)) as User;
    if (!isEmpty(user)) req.user = user;
  } catch (error) {
    return handleTokenError(error);
  }

  if (isEmpty(req.user)) {
    return ErrorResponse('Not authorized to access this route', 401);
  }
  next();
};

export const authorize: AuthorizeRoles = (...roles) => {
  return async (req, _params, next) => {
    if (!roles.includes(req.user.role)) return ErrorResponse('Forbidden: Access denied', 401);
    next();
  };
};
