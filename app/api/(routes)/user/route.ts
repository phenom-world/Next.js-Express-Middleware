import prisma from '@/prisma';

import { ApiResponse, asyncHandler } from '../../lib';
import { handler, protect } from '../../middlewares';
import { CustomRequest } from '../../middlewares/types';

const handleGetLoggedinUser = asyncHandler(async (req: CustomRequest) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  return ApiResponse(user);
});

const GET = handler(protect, handleGetLoggedinUser);

export { GET };
