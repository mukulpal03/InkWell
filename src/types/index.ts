import { Document, Types } from "mongoose";
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

export interface IApiKey extends Document {
  _id: string;
  key: string;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  slug?: string;
  status?: PostStatus;
  user?: Types.ObjectId;
  category?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostReview extends Document {
  _id: string;
  post: Types.ObjectId;
  isApproved: boolean;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostStatus = "pending" | "approved" | "rejected";

export interface IComment extends Document {
  _id: string;
  post: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory extends Document {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export interface postData {
  title: string;
  content: string;
  category: string;
}

export interface PaginateOptions {
  page: number;
  limit: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
