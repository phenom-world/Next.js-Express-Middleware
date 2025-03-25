import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { ObjectData } from '@/types';

import { CustomRequest } from '../../middlewares/types';
import { AsyncHandler } from '../types';
import { handlePrismaError } from './prisma-error';
import { ErrorResponse } from './shared';

export const asyncHandler = <T extends ObjectData>(handler: AsyncHandler<T>) => {
  return async (req: CustomRequest, params?: { params: Promise<T> }) => {
    try {
      const resolvedParams = (await params?.params) ?? ({} as T);
      const resp = await handler(req, resolvedParams);
      return resp;
    } catch (error) {
      if (error?.isApiException) {
        const { message, statusCode, data } = error;
        return ErrorResponse(message, statusCode, data);
      } else if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientValidationError
      ) {
        return handlePrismaError(error);
      } else {
        return ErrorResponse('Internal Server Error', 500);
      }
    }
  };
};
