import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '@/prisma';
import { User } from '@/types';

export const ErrorResponse = (message: string | object, status?: number, data?: object) => {
  return NextResponse.json({ message, ...data }, { status: status || 400 });
};
export const ApiResponse = (data: object | null, message?: string, status?: number) => {
  return NextResponse.json({ data, success: true, message }, { status: status || 200 });
};

export const handleTokenError = (error?: JsonWebTokenError) => {
  if (error?.name === 'TokenExpiredError') {
    return ErrorResponse('Token has expired, please login again', 403);
  }
  return ErrorResponse('Invalid Token', 403);
};

export const authenticateUser = async ({ id, role }: { id: string; role: UserRole }) => {
  if (!id || !role) return;
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: parseInt(process.env.JWT_EXPIRY!),
  });

  await cookies().then((res) => {
    res.set('auth', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.JWT_EXPIRY!),
    });
  });

  return { token };
};

// verify token
export const verifyToken = async (token: string, secret: string): Promise<User | null> => {
  const decoded = jwt.verify(token, secret) as User;
  if (!decoded) return null;
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) return null;
  return user;
};
