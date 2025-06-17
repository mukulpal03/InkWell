import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRY: process.env.JWT_EXPIRY ?? "1d",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
