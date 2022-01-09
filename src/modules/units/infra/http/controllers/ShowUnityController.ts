import { Request, Response } from "express";
import { ShowUnityUseCase } from "../../../useCases/showUnity/ShowUnityUseCase";

export class ShowUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId } = request.params;

    const showUnityUseCase = new ShowUnityUseCase();

    const unity = await showUnityUseCase.execute({ userId, unityId });

    return response.json(unity);
  }
}
