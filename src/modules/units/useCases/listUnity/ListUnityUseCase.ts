import { prisma } from "../../../../database/prismaClient";

interface ListUnits {
  userId: string;
}

export class ListUnityUseCase {
  async execute({ userId }: ListUnits) {
    return prisma.unity.findMany({
      where: {
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
