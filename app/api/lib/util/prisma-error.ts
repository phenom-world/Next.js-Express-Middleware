import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ErrorResponse } from './shared';

export const handlePrismaError = (
  error: PrismaClientKnownRequestError | PrismaClientValidationError
) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      error.message =
        (error && error.meta && Array.isArray(error.meta.target) ? error.meta.target : [])
          .map((value) => String(value))
          .join(', ') + ' already exists';
      return ErrorResponse(error.message);
    } else if (error.code === 'P2003') {
      error.message =
        (error.meta?.field_name as string).split('_')[1] + ' is invalid or has been deleted';
      return ErrorResponse(error.message);
    } else {
      return ErrorResponse(
        error?.meta?.cause || error?.meta?.target || 'Internal Server Error',
        500
      );
    }
  } else if (error instanceof PrismaClientValidationError) {
    if (error?.message.includes('Invalid value for argument')) {
      const errorMessage = error.message
        .split('Invalid value for argument')[1]
        .trim()
        ?.split('.')[0];
      return ErrorResponse('Invalid value for' + errorMessage + ' field', 400);
    } else {
      return ErrorResponse('Internal Server Error', 500);
    }
  }
};
