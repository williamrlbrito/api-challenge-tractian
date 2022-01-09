import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

export class ListUsersUseCase {
  async execute(userId: string) {
    const users = await prisma.user.findMany({
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
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.map((user) => {
      return {
        ...user,
        avatarUrl: buildUrl(user.avatar),
      };
    });
  }
}
