import { prisma } from "../../../../database/prismaClient";

interface IListUnityAsset {
  userId: string;
  unityId: string;
}

export class ListUnityAssetsUseCase {
  async execute({ userId, unityId }: IListUnityAsset) {
    return prisma.asset.findMany({
      where: {
        unity: {
          id: unityId,
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
