import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { upload } from "./config/upload";
import { routes } from "./routes";

import swaggerFile from "./swagger.json";

import "./shared/container";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/files", express.static(upload.uploadsFolder));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server is running on port ${port}`));
