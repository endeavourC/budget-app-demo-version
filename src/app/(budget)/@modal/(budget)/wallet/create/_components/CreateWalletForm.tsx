"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { CurrencySelect } from "@/common/components/CurrencySelect/CurrencySelect";
import {
  AvailableCurrencies,
  getCurrencySymbolByValue,
} from "@/common/components/CurrencySelect/types/currencies";
import { useRouter } from "next/navigation";
import { MonthlyStrategiesField } from "./MonthlyStrategiesField";
import { omit } from "lodash";

interface IProps {
  onClose: () => void;
}

export const CreateWalletForm: React.FC<IProps> = ({ onClose }) => {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: "PLN",
      monthlySavingStrategies: [],
    },
  });

  methods.watch(["currency"]);

  const onSubmit = async (data: FormData) => {
    const request = await fetch("/api/wallet", {
      method: "POST",
      body: JSON.stringify(mapData(data)),
    });

    const response = await request.json();

    if (response.status === "ok") {
      onClose();
      router.push("/");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} method="POST">
        <div className="my-6">
          <Input
            type="text"
            {...methods.register("name")}
            label="Wallet Name"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your wallet name"
            validationState={
              methods.formState.errors.name ? "invalid" : "valid"
            }
            errorMessage={methods.formState.errors.name?.message}
          />
        </div>

        <MonthlyStrategiesField />

        <div className="my-6">
          <Input
            type="number"
            {...methods.register("balance")}
            label="Your Balance"
            radius="sm"
            labelPlacement="outside"
            placeholder="Enter your balance"
            validationState={
              methods.formState.errors.balance ? "invalid" : "valid"
            }
            errorMessage={methods.formState.errors.balance?.message}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  {getCurrencySymbolByValue(
                    methods.getValues("currency") as AvailableCurrencies
                  )}
                </span>
              </div>
            }
          />
        </div>
        <div className="my-6">
          <label className="text-black text-sm font-medium block pb-1.5">
            Currency
          </label>
          <CurrencySelect control={methods.control} name="currency" />
        </div>
        <div className="flex items-center justify-end py-4">
          <Button
            type="submit"
            className="bg-primaryColor text-white"
            isLoading={methods.formState.isSubmitting}
          >
            Create wallet
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

const mapData = (data: FormData) => {
  return {
    ...data,
    monthlySavingStrategies: data.monthlySavingStrategies.map((item) =>
      omit(item, ["id", "itemId"])
    ),
  };
};
