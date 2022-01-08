import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateAccount {
  name: string;
  email: string;
  password: string;
}

export class CreateAccountUseCase {
  async execute({ name, email, password }: ICreateAccount) {
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

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
