import { prisma } from "../../../../database/prismaClient";

interface LinkCompany {
  userId: string;
  companyId: string;
}

export class LinkCompanyUseCase {
  async execute({ userId, companyId }: LinkCompany) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userLinked = await prisma.user.findFirst({
      where: {
        id: userId,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });

    if (userLinked) {
      throw new Error("User already linked to this company");
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        companies: {
          connect: {
            id: companyId,
          },
        },
      },
    });
  }
}
