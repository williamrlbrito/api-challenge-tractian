import { prisma } from "../../../../database/prismaClient";

interface ShowCompany {
  userId: string;
  companyId: string;
}

export class ShowCompanyUseCase {
  async execute({ userId, companyId }: ShowCompany) {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }
}
