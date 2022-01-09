import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
  userId: string;
  companyId: string;
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ userId, companyId, name, email, password }: ICreateUser) {
    const userExists = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

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
      throw new Error("Company does not exist or you are not authorized");
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companies: {
          connect: {
            id: companyId,
          },
        },
      },
    });
  }
}
