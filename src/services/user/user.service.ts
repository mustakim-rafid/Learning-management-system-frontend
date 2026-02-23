"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { adminRegisterZodSchema } from "@/zod/auth.validation";

export const createAdmin = async (_initialState: any, formData: FormData) => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const zodResponse = adminRegisterZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    const newFormData = new FormData();

    newFormData.set("name", zodResponse.data.name.toString());
    newFormData.set("email", zodResponse.data.email.toString());
    newFormData.set("password", zodResponse.data.password.toString());

    const file = formData.get("avatar");
    if (file instanceof File && file.size > 0 && file.name !== undefined) {
      newFormData.set("avatar", formData.get("avatar") as Blob);
    }

    const res = await serverFetch.post("/user/create-admin", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: "Admin creation failed",
    };
  }
};

export const getAllUsers = async (queryParams: string) => {
  try {
    const res = await serverFetch.get(
      `/user?${queryParams ? queryParams : ""}`,
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while getting users",
    };
  }
};

export const softDelete = async (userId: string) => {
  try {
    const res = await serverFetch.patch(`/user/${userId}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "User deletion failed",
    };
  }
};
