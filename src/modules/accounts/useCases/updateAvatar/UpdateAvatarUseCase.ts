import { injectable, inject } from "tsyringe";
import { prisma } from "../../../../database/prismaClient";
import IStorageProvider from "../../../../shared/container/providers/StorageProvider/models/IStorageProvider";

interface IUpdateAvatar {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFileName }: IUpdateAvatar) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Only authenticated users can change avatar");
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: fileName },
    });
  }
}

export { UpdateAvatarUseCase };
