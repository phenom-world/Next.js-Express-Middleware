import { NextResponse } from 'next/server';
import { ZodIssue } from 'zod';
import { CustomRequest } from '../lib';
import { ObjectData } from '@/types';
import { NextFunction } from '../middlewares/types';

export type ValidateParseResponse = { success: boolean; error: { errors: ZodIssue[] } };

export type ValidateCreateUser = (
  req: CustomRequest,
  params: { params: Promise<ObjectData> },
  next: NextFunction
) => Promise<NextResponse | void>;
