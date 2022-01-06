import { Request, Response } from "express";
import { ListUnityUseCase } from "../../../useCases/listUnity/ListUnityUseCase";

export class ListUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;

    const listUnityUseCase = new ListUnityUseCase();

    const result = await listUnityUseCase.execute(userId, companyId);

    return response.json(result);
  }
}
