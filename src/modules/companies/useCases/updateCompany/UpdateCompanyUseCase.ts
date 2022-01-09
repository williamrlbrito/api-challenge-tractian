import { prisma } from "../../../../database/prismaClient";

interface IUpdateCompany {
  userId: string;
  companyId: string;
  name: string;
}

export class UpdateCompanyUseCase {
  async execute({ userId, companyId, name }: IUpdateCompany) {
    const comanyExists = await prisma.company.findFirst({
      where: {
        id: companyId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!comanyExists) {
      throw new Error("Company not found");
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        name,
      },
    });

    return updatedCompany;
  }
}
