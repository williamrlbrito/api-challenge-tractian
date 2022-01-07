import { Request, Response } from "express";
import { ShowProfileUseCase } from "../../../useCases/showProfile/ShowProfileUseCase";

export class ShowProfileController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const showProfileUseCase = new ShowProfileUseCase();

    const result = await showProfileUseCase.execute(userId);

    return response.json(result);
  }
}
