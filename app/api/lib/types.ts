import { NextResponse } from 'next/server';

import { CustomRequest } from '../middlewares/types';

import { ObjectData } from '@/types';

export type AsyncHandler<T extends ObjectData> = (
  req: CustomRequest,
  params: T
) => Promise<NextResponse>;
