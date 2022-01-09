import { prisma } from "../../../../database/prismaClient";

interface UnlinkCompany {
  userId: string;
  companyId: string;
}

export class UnlinkCompanyUseCase {
  async execute({ userId, companyId }: UnlinkCompany) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const linkedCompanies = await prisma.company.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (linkedCompanies.length === 1) {
      throw new Error("You can't unlink the last company");
    }

    await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }
}
