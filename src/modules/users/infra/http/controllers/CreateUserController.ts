import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../useCases/createUser/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId, name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      userId,
      companyId,
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}
