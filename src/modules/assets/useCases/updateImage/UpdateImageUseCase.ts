import { injectable, inject } from "tsyringe";
import { prisma } from "../../../../database/prismaClient";
import IStorageProvider from "../../../../shared/container/providers/StorageProvider/models/IStorageProvider";

interface IUpdateImage {
  assetId: string;
  imageFileName: string;
}

@injectable()
class UpdateImageUseCase {
  constructor(
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ assetId, imageFileName }: IUpdateImage) {
    const asset = await prisma.asset.findFirst({
      where: { id: assetId },
    });

    if (!asset) {
      throw new Error("Asset not found");
    }

    if (asset.image) {
      await this.storageProvider.deleteFile(asset.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFileName);

    await prisma.asset.update({
      where: { id: assetId },
      data: { image: fileName },
    });
  }
}

export { UpdateImageUseCase };
