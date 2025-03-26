import prisma from '@/prisma';

import { ApiResponse, asyncHandler, ErrorResponse } from '../../../lib';
import { protect, authorize, handler } from '../../../middlewares';
import { CustomRequest } from '@/app/api/middlewares/types';

const handleDeleteUser = asyncHandler(async (_req: CustomRequest, params: { id: string }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return ErrorResponse('User not found', 404);
  }
  await prisma.user.delete({ where: { id } });
  return ApiResponse(null, 'User deleted successfully');
});

const DELETE = handler(protect, authorize('ADMIN'), handleDeleteUser);

export { DELETE };
