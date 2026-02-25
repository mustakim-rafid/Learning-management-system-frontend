"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { createLessonZodSchema } from "@/zod/lesson.validation";

export const createLesson = async (_initialState: any, formData: FormData) => {
  try {
    const validationData = {
      title: formData.get("title")?.toString() || "",
      courseId: formData.get("courseId")?.toString() || "",
      contentType: formData.get("contentType")?.toString() as
        | "VIDEO"
        | "TEXT",
      contentUrl: formData.get("contentUrl")?.toString() || null,
      contentText: formData.get("contentText")?.toString() || null,
      duration: formData.get("duration")
        ? Number(formData.get("duration"))
        : undefined,
      order: formData.get("order") ? Number(formData.get("order")) : undefined,
    };

    // Validate using Zod
    const zodResponse = createLessonZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    // Prepare FormData for upload
    console.log(zodResponse)
    const newFormData = new FormData();
    newFormData.set("title", zodResponse.data.title);
    newFormData.set("courseId", zodResponse.data.courseId);
    newFormData.set("contentType", zodResponse.data.contentType);

    if (zodResponse.data.contentUrl)
      newFormData.set("contentUrl", zodResponse.data.contentUrl);

    if (zodResponse.data.contentText)
      newFormData.set("contentText", zodResponse.data.contentText);

    if (zodResponse.data.duration !== undefined)
      newFormData.set("duration", String(zodResponse.data.duration));

    if (zodResponse.data.order !== undefined)
      newFormData.set("order", String(zodResponse.data.order));

    // Check for video file if contentType is VIDEO
    const file = formData.get("file");
    if (
      zodResponse.data.contentType === "VIDEO" &&
      file instanceof File &&
      file.size > 0
    ) {
      newFormData.set("video", file);
    }

    // Send to backend
    const res = await serverFetch.post("/lesson", { body: newFormData });
    const result = await res.json();

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: "Lesson creation failed",
    };
  }
};

export const getLessonById = async (lessonId: string) => {
  try {
    const res = await serverFetch.get(`/lesson/${lessonId}`);
    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch lesson",
    };
  }
};