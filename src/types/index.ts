import { Document } from "mongoose";
import { Request, Response, NextFunction } from "express";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordCorrect: (password: string) => boolean;
  generateJWT: () => string;
}

export type UserRole = "user" | "admin";

export interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface loginData {
  email: string;
  password: string;
}
