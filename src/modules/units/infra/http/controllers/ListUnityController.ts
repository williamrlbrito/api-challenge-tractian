import { Request, Response } from "express";
import { ListUnityUseCase } from "../../../useCases/listUnity/ListUnityUseCase";

export class ListUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listUnityUseCase = new ListUnityUseCase();

    const unitys = await listUnityUseCase.execute({ userId });

    return response.json(unitys);
  }
}
