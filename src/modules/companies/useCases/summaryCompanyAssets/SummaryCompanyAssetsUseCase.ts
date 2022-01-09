import { prisma } from "../../../../database/prismaClient";

interface ISummaryCompanyAssets {
  userId: string;
  companyId: string;
}

export class SummaryCompanyAssetsUseCase {
  async execute({ userId, companyId }: ISummaryCompanyAssets) {
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
