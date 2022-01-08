import { Request, Response } from "express";
import { CreateAccountUseCase } from "../../../useCases/createAccount/CreateAccountUseCase";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createAccountUseCase = new CreateAccountUseCase();

    await createAccountUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}
