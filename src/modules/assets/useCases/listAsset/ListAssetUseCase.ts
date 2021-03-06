import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

interface ListAsset {
  userId: string;
}

export class ListAssetUseCase {
  async execute({ userId }: ListAsset) {
    const assets = await prisma.asset.findMany({
      where: {
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

    return assets.map((asset) => {
      return {
        ...asset,
        imageUrl: buildUrl(asset.image),
      };
    });
  }
}
