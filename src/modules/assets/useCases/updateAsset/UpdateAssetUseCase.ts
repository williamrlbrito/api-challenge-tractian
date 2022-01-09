import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

interface IUpdateAsset {
  userId: string;
  assetId: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: string;
  healthLevel: number;
}

export class UpdateAssetUseCase {
  async execute({
    userId,
    assetId,
    name,
    description,
    model,
    owner,
    status,
    healthLevel,
  }: IUpdateAsset) {
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

    const updatedAsset = await prisma.asset.update({
      where: {
        id: assetId,
      },
      data: {
        name,
        description,
        model,
        owner,
        status,
        healthLevel,
      },
    });

    return {
      ...updatedAsset,
      imageUrl: buildUrl(updatedAsset.image),
    };
  }
}
