import { buildUrl } from "../../../../config/upload";
import { prisma } from "../../../../database/prismaClient";

export class ShowProfileUseCase {
  async execute(userId: string) {
    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    return {
      ...profile,
      avatarUrl: buildUrl(profile.avatar),
    };
  }
}
