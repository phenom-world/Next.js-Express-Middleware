import prisma from '@/prisma';

import { ApiResponse, asyncHandler, authenticateUser, ErrorResponse, exclude } from '../../../lib';
import { validateLoginBody } from '../../../validator/auth.validation';
import bcrypt from 'bcryptjs';

import { CustomRequest } from '@/app/api/middlewares/types';
import { handler } from '../../../middlewares';

const loginUser = asyncHandler(async (req: CustomRequest) => {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: email?.trim().toLowerCase() },
    select: { id: true, email: true, password: true, role: true },
  });

  if (!user) {
    return ErrorResponse('invalid username and password', 401);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password as string);
  if (!isPasswordValid) {
    return ErrorResponse('invalid username and password', 401);
  }
  const resp = exclude(user, ['password']);
  const authResp = await authenticateUser({ id: user.id, role: user.role });
  return ApiResponse({ ...resp, accessToken: authResp?.token });
});

const POST = handler(validateLoginBody, loginUser);

export { POST };
