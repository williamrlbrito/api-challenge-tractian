import { prisma } from "../../../../database/prismaClient";

interface ICreateAsset {
  userId: string;
  unityId: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: string;
  healthLevel: number;
}

export class CreateAssetUseCase {
  async execute({
    userId,
    unityId,
    name,
    description,
    model,
    owner,
    status,
    healthLevel,
  }: ICreateAsset) {
    const companyAuthorized = await prisma.company.findFirst({
      where: {
        units: {
          some: {
            id: unityId,
          },
        },
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!companyAuthorized) {
      throw new Error(
        "Unity or Company does not exist or you are not authorized"
      );
    }

    const assetExists = await prisma.asset.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        unityId,
      },
    });

    if (assetExists) {
      throw new Error("Asset already exists");
    }

    const asset = await prisma.asset.create({
      data: {
        unityId,
        name,
        description,
        model,
        owner,
        status,
        healthLevel,
      },
    });

    return Object.assign({}, asset, { unityId: undefined });
  }
}
