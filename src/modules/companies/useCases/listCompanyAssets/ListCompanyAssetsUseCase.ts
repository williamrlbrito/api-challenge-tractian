import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

interface IListAsset {
  userId: string;
  companyId?: string;
  unityId?: string;
  status?: string;
}

export class ListCompanyAssetsUseCase {
  async execute({ userId, companyId }: IListAsset) {
    const assets = await prisma.asset.findMany({
      where: {
        unity: {
          company: {
            id: companyId,
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
