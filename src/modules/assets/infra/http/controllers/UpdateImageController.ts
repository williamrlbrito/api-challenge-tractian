import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateImageUseCase } from "../../../useCases/updateImage/UpdateImageUseCase";

export class UpdateImageController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    const { assetId } = request.params;
    const imageFileName = file.filename;

    const updateImageUseCase = container.resolve(UpdateImageUseCase);

    await updateImageUseCase.execute({
      assetId,
      imageFileName,
    });

    return response.status(204).send();
  }
}
