import { compare, hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IUpdateProfile {
  id: string;
  name: string;
  oldPassword?: string;
  password: string;
}

export class UpdateProfileUseCase {
  async execute({ id, name, password, oldPassword }: IUpdateProfile) {
    const accountExists = await prisma.user.findFirst({
      where: { id },
    });

    if (!accountExists) {
      throw new Error("Account not found");
    }

    accountExists.name = name;

    if (password && !oldPassword) {
      throw new Error(
        "You need to inform the old password to set a new password"
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(
        oldPassword,
        accountExists.password
      );

      if (!checkOldPassword) {
        throw new Error("Old password does not match");
      }

      accountExists.password = await hash(password, 10);
    }

    const updatedAccount = await prisma.user.update({
      where: { id },
      data: accountExists,
    });

    return Object.assign({}, updatedAccount, { password: undefined });
  }
}
