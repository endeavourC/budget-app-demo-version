"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  AvailableCurrencies,
  getCurrencySymbolByValue,
} from "@/common/components/CurrencySelect/types/currencies";
import { useRouter } from "next/navigation";
import { EntityID } from "@/types/types";
import { IExpenseCategory } from "@/models/ExpenseCategory";

interface IProps {
  onClose: () => void;
  currency: AvailableCurrencies;
  walletId: EntityID;
  categories: IExpenseCategory[];
}

export const AddTransactionForm: React.FC<IProps> = ({
  onClose,
  currency,
  walletId,
  categories,
}) => {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    const request = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({ ...data, walletId }),
    });
    const response = await request.json();
    if (response.status === "ok") {
      onClose();
      router.refresh();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} method="POST">
        <div className="my-6">
          <Input
            type="text"
            {...methods.register("name")}
            label="Transaction Name"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your transaction name"
            isInvalid={!!methods.formState.errors.name}
            errorMessage={methods.formState.errors.name?.message}
          />
        </div>

        <div className="my-6">
          <Input
            type="number"
            {...methods.register("amount")}
            label="Amount"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your amount"
            isInvalid={!!methods.formState.errors.amount}
            errorMessage={methods.formState.errors.amount?.message}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  {getCurrencySymbolByValue(currency)}
                </span>
              </div>
            }
          />
        </div>
        {categories.length ? (
          <div className="my-6">
            <Select
              {...methods.register("categoryId")}
              label="Category"
              radius="sm"
              labelPlacement="outside"
              placeholder="Select your expense category"
              isInvalid={!!methods.formState.errors.categoryId}
              errorMessage={methods.formState.errors.categoryId?.message}
            >
              {categories.map((category) => (
                <SelectItem key={category._id as unknown as string}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        ) : null}
        <div className="flex items-center justify-end py-4">
          <Button
            type="submit"
            className="bg-primaryColor text-white"
            isLoading={methods.formState.isSubmitting}
          >
            Add transaction
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
