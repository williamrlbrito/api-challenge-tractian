import { prisma } from "../../../../database/prismaClient";

export class ListUnityUseCase {
  async execute(userId: string, companyId: string) {
    return prisma.unity.findMany({
      where: {
        companyId,
        company: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      },
    });
  }
}
