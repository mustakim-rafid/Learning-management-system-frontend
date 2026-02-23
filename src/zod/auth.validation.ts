import z from "zod";

export const registerZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Email is required or invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "instructor"], "Role is required"), 
});

export const loginUserZodSchema = z.object({
  email: z.email("Email is required or invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const adminRegisterZodSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Email is required or invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
