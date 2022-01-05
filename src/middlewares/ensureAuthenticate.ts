import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { auth } from "../config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  const { secret } = auth.jwt;

  try {
    const { sub } = verify(token, secret) as IPayload;

    request.userId = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Token invalid" });
  }
}
