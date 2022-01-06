import { prisma } from "../../../../database/prismaClient";

interface ICreateUnity {
  userId: string;
  companyId: string;
  name: string;
}

export class CreateUnityUseCase {
  async execute({ userId, companyId, name }: ICreateUnity) {
    const companyExists = await prisma.company.findFirst({
      where: {
        id: companyId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!companyExists) {
      throw new Error("Company does not exist");
    }

    const unityExists = await prisma.unity.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (unityExists) {
      throw new Error("Unity already exists");
    }

    const unity = await prisma.unity.create({
      data: {
        companyId,
        name,
      },
    });

    return Object.assign({}, unity, { companyId: undefined });
  }
}
