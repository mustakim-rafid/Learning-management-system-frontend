"use server";

import { serverFetch } from "@/lib/serverFetch";

export const createEnrollment = async (payload: { courseId: string }) => {
  try {
    const res = await serverFetch.post("/enrollment", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const enrollmentPayment = async (enrollmentId: string) => {
  try {
    const res = await serverFetch.post(`/enrollment/${enrollmentId}/payment`)
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};