import prisma from '@/prisma';

import { ApiResponse, asyncHandler } from '../../../lib';
import { handler } from '../../../middlewares';
import { validateSignupBody } from '../../../validator/auth.validation';
import { CustomRequest } from '../../../middlewares/types';
import bcrypt from 'bcryptjs';

const handleSignup = asyncHandler(async (req: CustomRequest) => {
  const { email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  return ApiResponse(user);
});

const POST = handler(validateSignupBody, handleSignup);

export { POST };
