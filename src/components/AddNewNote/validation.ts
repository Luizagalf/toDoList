import { object, string } from "yup";

export const validationSchema = object({
  text: string().nullable().max(50, "No more than 50 characters"),
  title: string()
    .nullable()
    .max(20, "No more than 20 characters")
    .required("Enter a title"),
  priority: string().required()
});
