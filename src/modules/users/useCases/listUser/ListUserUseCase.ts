import { prisma } from "../../../../database/prismaClient";

export class ListUserUseCase {
  async execute(userId: string) {
    return prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        companies: {
          some: {
            users: {
              some: {
                id: userId,
              },
            },
          },
        },
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
