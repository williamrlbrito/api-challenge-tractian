import { prisma } from "../../../../database/prismaClient";

interface ICreateCompany {
  userId: string;
  name: string;
}

export class CreateCompanyUseCase {
  async execute({ userId, name }: ICreateCompany) {
    const companyExists = await prisma.company.findFirst({
      where: {
        userId,
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (companyExists) {
      throw new Error("Company already exists");
    }

    const company = await prisma.company.create({
      data: {
        userId,
        name,
      },
    });

    return Object.assign({}, company, { userId: undefined });
  }
}
