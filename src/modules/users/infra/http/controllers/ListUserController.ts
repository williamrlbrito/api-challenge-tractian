import { Request, Response } from "express";
import { ListUserUseCase } from "../../../useCases/listUser/ListUserUseCase";

export class ListUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listUserUseCase = new ListUserUseCase();

    const result = await listUserUseCase.execute(userId);

    return response.json(result);
  }
}
