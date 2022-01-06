import { prisma } from "../../../../database/prismaClient";

interface IListAsset {
  userId: string;
  unityId?: string;
}

export class ListAssetUseCase {
  async execute({ userId, unityId }: IListAsset) {
    return prisma.asset.findMany({
      where: {
        unityId,
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
  }
}
