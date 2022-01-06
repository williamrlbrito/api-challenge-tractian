import { prisma } from "../../../../database/prismaClient";

export class ListCompanyUseCase {
  async execute(userId: string) {
    return prisma.company.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
}
