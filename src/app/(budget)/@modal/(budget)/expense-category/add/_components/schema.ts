import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Category Name field is required"),
    color: yup.string().required("Color field is required"),
    icon: yup.string().required("Icon field is required"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
