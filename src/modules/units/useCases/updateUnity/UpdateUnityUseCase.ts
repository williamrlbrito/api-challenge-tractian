import { prisma } from "../../../../database/prismaClient";

interface IUpdateUnity {
  userId: string;
  unityId: string;
  name: string;
}

export class UpdateUnityUseCase {
  async execute({ userId, unityId, name }: IUpdateUnity) {
    const unityExists = await prisma.unity.findFirst({
      where: {
        id: unityId,
        company: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      },
    });

    if (!unityExists) {
      throw new Error("Unity not found");
    }

    const unityUpdated = await prisma.unity.update({
      where: {
        id: unityId,
      },
      data: {
        name,
      },
    });

    return unityUpdated;
  }
}
