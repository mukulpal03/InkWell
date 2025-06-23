import mongoose from "mongoose";
import { ICategory } from "../types";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
