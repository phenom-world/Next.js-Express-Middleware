import { ErrorResponse } from '../lib';
import { ExecMiddleware, Handler } from './types';

const execMiddleware: ExecMiddleware = async (middleware, request, params) => {
  for (const middlewareFn of middleware) {
    let nextInvoked = false;
    const next = async () => {
      nextInvoked = true;
    };
    const result = await middlewareFn(request, params, next);
    if (!nextInvoked) {
      return result;
    }
  }
};

export const handler: Handler =
  (...middleware) =>
  async (request, params) => {
    const result = await execMiddleware(middleware, request, params);
    if (result) {
      return result;
    }
    return ErrorResponse('Your handler or middleware must return a NextResponse!', 400);
  };
