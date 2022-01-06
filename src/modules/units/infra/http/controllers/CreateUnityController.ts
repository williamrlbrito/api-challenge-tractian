import { Request, Response } from "express";
import { CreateUnityUseCase } from "../../../../units/useCases/createUnity/CreateUnityUseCase";

export class CreateUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId, name } = request.body;

    const createUnityUseCase = new CreateUnityUseCase();

    const result = await createUnityUseCase.execute({
      userId,
      companyId,
      name,
    });

    return response.json(result);
  }
}
