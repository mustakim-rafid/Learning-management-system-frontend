"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { registerZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./login";

export const register = async (_initialState: any, formData: FormData) => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const zodResponse = registerZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    const newFormData = new FormData();

    newFormData.set("name", zodResponse.data.name.toString());
    newFormData.set("email", zodResponse.data.email.toString());
    newFormData.set("password", zodResponse.data.password.toString());

    const file = formData.get("avatar");
    if (file instanceof File && file.size > 0 && file.name !== undefined) {
      newFormData.append("avatar", file);
    }

    let res;
    if (zodResponse.data.role === "instructor") {
      res = await serverFetch.post("/user/create-instructor", {
        body: newFormData,
      });
    } else if (zodResponse.data.role === "student") {
      res = await serverFetch.post("/user/create-student", {
        body: newFormData,
      });
    } else {
      throw new Error("Invalid role");
    }

    const result = await res.json();

    if (!result.success && result.error) {
      return result;
    }

    if (result.success) {
      await loginUser(_initialState, formData);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
};
