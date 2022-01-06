import { prisma } from "../../../../database/prismaClient";

interface ICreateCompany {
  userId: string;
  name: string;
}

export class CreateCompanyUseCase {
  async execute({ userId, name }: ICreateCompany) {
    const companyExists = await prisma.company.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (companyExists) {
      throw new Error("Company already exists");
    }

    const company = await prisma.company.create({
      data: {
        name,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return Object.assign({}, company, { userId: undefined });
  }
}
