import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Transaction Name field is required"),
    amount: yup
      .number()
      .nullable()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .required("Amount field is required"),
    type: yup.string().oneOf(["income", "expense"]),
    categoryId: yup.string().required("Category field is required"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
