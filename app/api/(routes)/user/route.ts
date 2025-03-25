import prisma from '@/prisma';

import { ApiResponse, asyncHandler } from '../../lib';
import { authorizeUser, handler } from '../../middlewares';
import { CustomRequest } from '../../middlewares/types';

const handleGetLoggedinUser = asyncHandler(async (req: CustomRequest) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  return ApiResponse(user);
});

const GET = handler(authorizeUser, handleGetLoggedinUser);

export { GET };
