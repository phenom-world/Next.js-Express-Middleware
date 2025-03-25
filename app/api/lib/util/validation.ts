import { NextResponse } from 'next/server';
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';
import { ValidateParseResponse } from '../../validator/types';
import { NextFunction } from '../../middlewares/types';
import { ErrorResponse } from './shared';

const options: ErrorMessageOptions = {
  delimiter: {
    error: ', ',
    component: ': ',
  },
  path: {
    enabled: true,
    type: 'objectNotation',
    transform: ({ value }) => value,
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    transform: ({ value }) => value,
  },
};

export const validationCheck = (
  response: ValidateParseResponse,
  next: NextFunction
): NextResponse | void => {
  if (!response.success) {
    const { errors } = response.error;
    const errorMessage = generateErrorMessage(errors, options);
    return ErrorResponse(errorMessage, 422);
  }
  next();
};
