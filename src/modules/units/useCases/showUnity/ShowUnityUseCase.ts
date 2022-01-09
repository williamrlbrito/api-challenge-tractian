import { prisma } from "../../../../database/prismaClient";

interface ShowUnity {
  userId: string;
  unityId: string;
}

export class ShowUnityUseCase {
  async execute({ userId, unityId }: ShowUnity) {
    const unity = await prisma.unity.findFirst({
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

    if (!unity) {
      throw new Error("Unity not found");
    }

    return unity;
  }
}
