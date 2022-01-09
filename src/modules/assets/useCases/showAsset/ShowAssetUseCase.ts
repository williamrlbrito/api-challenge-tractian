import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

interface IShowAsset {
  userId: string;
  assetId: string;
}

export class ShowAssetUseCase {
  async execute({ userId, assetId }: IShowAsset) {
    const assetExists = await prisma.asset.findFirst({
      where: {
        id: assetId,
        unity: {
          company: {
            users: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
    });

    if (!assetExists) {
      throw new Error("Asset not found");
    }

    return {
      ...assetExists,
      imageUrl: buildUrl(assetExists.image),
    };
  }
}
