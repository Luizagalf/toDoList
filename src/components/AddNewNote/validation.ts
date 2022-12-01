import { object, string } from "yup";

export const validationSchema = object({
  text: string().nullable().max(150, "No more than 150 characters"),
  title: string()
    .nullable()
    .max(30, "No more than 30 characters")
    .required("Enter a title"),
  priority: string().required()
});
