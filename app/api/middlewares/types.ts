import { ObjectData, User } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';

export type NextFunction = () => void;

export type Middleware<T extends ObjectData = ObjectData> = (
  req: CustomRequest,
  params: { params: Promise<T> },
  next: NextFunction
) => Promise<NextResponse | void>;

export type ExecMiddleware = <T extends ObjectData>(
  middleware: Middleware<T>[],
  request: CustomRequest,
  params: { params: Promise<T> }
) => Promise<NextResponse | void>;

export type Handler = <T extends ObjectData>(
  ...middleware: Middleware<T>[]
) => (request: CustomRequest, params: { params: Promise<T> }) => Promise<NextResponse>;

export type AuthorizeUser = (
  req: CustomRequest,
  params: { params: Promise<ObjectData> },
  next: NextFunction
) => Promise<NextResponse | void>;

export type AuthorizeRoles = (
  ...roles: UserRole[]
) => (
  req: CustomRequest,
  params: { params: Promise<ObjectData> },
  next: NextFunction
) => Promise<NextResponse | void>;

export type CustomRequest = NextRequest & { user: User };
