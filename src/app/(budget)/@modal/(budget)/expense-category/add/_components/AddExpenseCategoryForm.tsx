"use client";
import dynamic from "next/dynamic";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormData, schema } from "./schema";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, Input, CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";
import { toast } from "react-toastify";

const IconPicker = dynamic(
  () => import("@/common/components/IconPicker/IconPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center">
        <CircularProgress size="md" />
      </div>
    ),
  }
);

interface IProps {
  onClose: () => void;
  walletId: Types.ObjectId;
}

export const AddExpenseCategoryForm: React.FC<IProps> = ({
  onClose,
  walletId,
}) => {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    const request = await fetch("/api/expense-category", {
      method: "POST",
      body: JSON.stringify({ ...data, walletId }),
    });

    const response = await request.json();

    if (response.status === "ok") {
      onClose();
      router.refresh();
      toast.success("Expense category added successfully");
    }
  };

  const onIconPickerChange = (icon: string) => {
    methods.setValue("icon", icon);
    methods.trigger("icon");
  };

  const selectedIcon = useWatch({ control: methods.control, name: "icon" });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} method="POST">
        <div className="my-6">
          <Input
            type="text"
            {...methods.register("name")}
            label="Expense Category Name"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your Expense Category"
            isInvalid={Boolean(methods.formState.errors.name)}
            errorMessage={methods.formState.errors.name?.message}
          />
        </div>

        <div className="my-6">
          <Input
            type="color"
            {...methods.register("color")}
            label="Color"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your color of your category"
            isInvalid={Boolean(methods.formState.errors.color)}
            errorMessage={methods.formState.errors.color?.message}
          />
        </div>

        <IconPicker
          selected={selectedIcon}
          hasErrors={Boolean(methods.formState.errors.icon)}
          onSelect={onIconPickerChange}
        />
        {methods.formState.errors.icon && (
          <p className="text-tiny text-danger mt-2">
            {methods.formState.errors.icon?.message}
          </p>
        )}

        <div className="flex items-center justify-end py-4">
          <Button
            type="submit"
            className="bg-primaryColor text-white"
            isLoading={methods.formState.isSubmitting}
          >
            Add expense category
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
