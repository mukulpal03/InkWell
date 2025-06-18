import mongoose from "mongoose";
import { IApiKey } from "../types";

const apiKeySchema = new mongoose.Schema<IApiKey>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ApiKey = mongoose.model<IApiKey>("ApiKey", apiKeySchema);

export default ApiKey;
