import Category from "../models/category";
import ApiError from "../utils/apiError";

export const validateAndAddCategory = async (name: string) => {
  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) throw new ApiError(400, "Category already exists");

    const category = await Category.create({ name });

    return category;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await Category.find({});

    return categories;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};
