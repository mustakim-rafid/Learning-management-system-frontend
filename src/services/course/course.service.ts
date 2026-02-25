"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { courseInputZodSchema } from "@/zod/course.validation";

export const createCourse = async (
  _initialState: any,
  formData: FormData
) => {
  try {
    const validationData = {
      title: formData.get("title"),
      description: formData.get("description"),
      isPaid: formData.get("isPaid") === "true",
      price: formData.get("price")
        ? Number(formData.get("price"))
        : undefined,
      categoryId: formData.get("categoryId") || undefined,
    };

    const zodResponse =
      courseInputZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    const newFormData = new FormData();

    newFormData.set("title", zodResponse.data.title.toString());

    if (zodResponse.data.description)
      newFormData.set(
        "description",
        zodResponse.data.description.toString()
      );

    if (zodResponse.data.isPaid !== undefined)
      newFormData.set(
        "isPaid",
        String(zodResponse.data.isPaid)
      );

    if (zodResponse.data.price !== undefined)
      newFormData.set(
        "price",
        String(zodResponse.data.price)
      );

    if (zodResponse.data.categoryId)
      newFormData.set(
        "categoryId",
        zodResponse.data.categoryId
      );

    const file = formData.get("thumbnail");
    if (file instanceof File && file.size > 0 && file.name) {
      newFormData.set("thumbnail", file);
    }

    const res = await serverFetch.post("/course", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message: "Course creation failed",
    };
  }
};

export const getInstructorCourses = async () => {
  try {
    const res = await serverFetch.get(
      "/course/instructor/courses"
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch instructor courses",
    };
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const res = await serverFetch.delete(`/course/${courseId}`);
    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Course deletion failed",
    };
  }
};

export const getCourseById = async (courseId: string) => {
  try {
    const res = await serverFetch.get(
      `/course/${courseId}`
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch course",
    };
  }
};

export const getAllCourses = async (queryParams: string) => {
  try {
    const res = await serverFetch.get(
      `/course?${queryParams ? queryParams : ""}`
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch courses",
    };
  }
};

export const getStudentCourses = async () => {
  try {
    const res = await serverFetch.get("/enrollment/student-courses")

    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch courses",
    };
  }
};