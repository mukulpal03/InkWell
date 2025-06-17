import { User } from "../models/user";
import { loginData, RegisterData } from "../types";
import ApiError from "../utils/apiError";

export const validateAndCreateUser = async (userData: RegisterData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) throw new ApiError(400, "User already exists");

    const user = await User.create({
      ...userData,
    });

    const token = user.generateJWT();

    return { user, token };
  } catch (error: any) {
    console.error(error.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateCredentialsAndGenerateToken = async (
  userData: loginData
) => {
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await user.isPasswordCorrect(userData.password);

    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = user.generateJWT();

    return { user, token };
  } catch (error: any) {
    console.error(error.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};
