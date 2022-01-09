import { Request, Response } from "express";
import { ListUsersUseCase } from "../../../useCases/listUsers/ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listUsersUseCase = new ListUsersUseCase();

    const result = await listUsersUseCase.execute(userId);

    return response.json(result);
  }
}
