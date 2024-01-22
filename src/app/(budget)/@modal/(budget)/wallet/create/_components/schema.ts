import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Wallet Name field is required"),
    monthlySavingStrategies: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Name field is required"),
          percentage: yup
            .number()
            .required("Percentage field is required")
            .transform((value) => (Number.isNaN(value) ? null : value))
            .min(0)
            .max(100),
        })
      )
      .required(),
    balance: yup
      .number()
      .required("Balance field is required")
      .transform((value) => (Number.isNaN(value) ? null : value)),
    currency: yup.string().required("Currency field is required"),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;
