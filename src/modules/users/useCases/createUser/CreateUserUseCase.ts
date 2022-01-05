import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUser) {
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

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return Object.assign({}, user, { password: undefined });
  }
}
