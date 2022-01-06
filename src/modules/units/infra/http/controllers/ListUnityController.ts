import { Request, Response } from "express";
import { ListUnityUseCase } from "../../../useCases/listUnity/ListUnityUseCase";

export class ListUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.query;

    const listUnityUseCase = new ListUnityUseCase();

    const result = await listUnityUseCase.execute({
      userId,
      companyId: companyId as string,
    });

    return response.json(result);
  }
}
