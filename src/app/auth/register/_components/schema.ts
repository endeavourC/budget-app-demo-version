import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username field is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
