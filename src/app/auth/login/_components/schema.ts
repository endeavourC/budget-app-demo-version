import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username field is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
