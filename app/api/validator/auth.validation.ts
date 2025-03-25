import { z } from 'zod';

import { validationCheck } from '../lib';
import { ValidateCreateUser, ValidateParseResponse } from './types';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = signUpSchema;

export const validateSignupBody: ValidateCreateUser = async (req, _params, next) => {
  const data = await req.clone().json();
  const response = signUpSchema.safeParse(data) as ValidateParseResponse;
  return validationCheck(response, next);
};

export const validateLoginBody: ValidateCreateUser = async (req, _params, next) => {
  const data = await req.clone().json();
  const response = loginSchema.safeParse(data) as ValidateParseResponse;
  return validationCheck(response, next);
};
