import { prisma } from "../../../../database/prismaClient";

export class ShowProfileUseCase {
  async execute(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
