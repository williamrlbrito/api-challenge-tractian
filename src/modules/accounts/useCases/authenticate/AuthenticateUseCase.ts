import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { auth } from "../../../../config/auth";
import { prisma } from "../../../../database/prismaClient";

interface IAuthenticate {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  async execute({ email, password }: IAuthenticate) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Username or password is incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Username or password is incorrect");
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({ email }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
    };
  }
}
