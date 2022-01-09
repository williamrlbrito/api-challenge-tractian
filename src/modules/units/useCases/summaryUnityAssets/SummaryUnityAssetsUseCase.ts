import { prisma } from "../../../../database/prismaClient";

interface ISummaryUnityAssets {
  userId: string;
  unityId: string;
}

export class SummaryUnityAssetsUseCase {
  async execute({ userId, unityId }: ISummaryUnityAssets) {
    const assets = await prisma.asset.findMany({
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

    const sumAssetsHealtLevel = assets.reduce((acc, asset) => {
      return acc + asset.healthLevel;
    }, 0);

    const healthLevel = sumAssetsHealtLevel / assets.length;

    const running = assets.filter((asset) => asset.status === "Running").length;

    const alerting = assets.filter(
      (asset) => asset.status === "Alerting"
    ).length;

    const atopped = assets.filter((asset) => asset.status === "Stopped").length;

    return {
      healthLevel,
      running,
      alerting,
      atopped,
    };
  }
}
