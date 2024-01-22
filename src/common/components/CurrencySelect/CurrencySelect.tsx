import React, { FC, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { AvailableCurrencies, currencies } from "./types/currencies";
import { useController } from "react-hook-form";
import classNames from "classnames";

interface IProps {
  control: any;
  name: string;
}

export const CurrencySelect: FC<IProps> = ({ control, name }) => {
  const {
    field,
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const setSelectedCurrency = (selected: Set<AvailableCurrencies>) => {
    const value = selected.values().next().value;
    field.onChange(value);
  };

  const buttonClasses = classNames({
    "capitalize text-bold w-32": true,
    "border-danger text-danger": invalid,
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className={buttonClasses}>
          {field.value}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={field.value}
        onSelectionChange={setSelectedCurrency}
      >
        {currencies.map(({ label, value }) => (
          <DropdownItem key={label}>{value}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
