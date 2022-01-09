import { prisma } from "../../../../database/prismaClient";

interface IListUnity {
  userId: string;
  companyId?: string;
}

export class ListCompanyUnitsUseCase {
  async execute({ userId, companyId }: IListUnity) {
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
