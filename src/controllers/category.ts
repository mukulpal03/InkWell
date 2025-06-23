import { Request, Response } from "express";
import { getAllCategories, validateAndAddCategory } from "../services/category";
import ApiResponse from "../utils/apiResponse";

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await validateAndAddCategory(name);

  return res
    .status(201)
    .json(new ApiResponse(201, "Category created successfully", category));
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await getAllCategories();

  return res
    .status(200)
    .json(new ApiResponse(200, "Categories fetched successfully", categories));
};

