"use client";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormData } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { Collapse } from "@/common/components/Collapse/Collapse";

const DEFAULT_PLACEHOLDER_LABEL = "Your strategy name...";

export const MonthlyStrategiesField = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "monthlySavingStrategies",
  });

  const addMonthlySavingStrategy = () => {
    append({
      name: "",
      percentage: "",
      itemId: uuidv4(),
    });
  };

  const removeMonthlySavingStrategy = (index: number) => {
    remove(index);
  };

  return (
    <div className="my-6">
      <p className="text-black text-sm font-medium flex items-center justify-start pb-1.5">
        Monthly Saving Strategies
        <Button
          onClick={addMonthlySavingStrategy}
          type="button"
          size="sm"
          variant="bordered"
          className="text-primaryColor border-primaryColor ml-4"
        >
          Add
        </Button>
      </p>
      <div className="flex flex-wrap gap-2 mb-4 mt-2">
        {fields.map((field, index) => (
          <Chip
            key={field.itemId}
            onClose={() => removeMonthlySavingStrategy(index)}
            variant="flat"
          >
            {field.name || DEFAULT_PLACEHOLDER_LABEL}
          </Chip>
        ))}
      </div>
      {fields.map((field, index) => (
        <Collapse
          className="my-2"
          key={field.itemId}
          title={field.name || DEFAULT_PLACEHOLDER_LABEL}
        >
          <div>
            <div className="my-6">
              <Input
                {...register(`monthlySavingStrategies.${index}.name`)}
                type="text"
                label="Your monthly saving strategy name"
                radius="sm"
                onChange={(e) => {
                  update(index, {
                    ...field,
                    name: e.target.value,
                  });
                }}
                labelPlacement="outside"
                placeholder="Enter your monthly saving strategy name"
                validationState={
                  errors.monthlySavingStrategies?.[index]?.name
                    ? "invalid"
                    : "valid"
                }
                errorMessage={
                  errors.monthlySavingStrategies?.[index]?.name?.message
                }
              />
            </div>
            <div className="my-6">
              <Input
                {...register(`monthlySavingStrategies.${index}.percentage`)}
                type="number"
                label="Your monthly saving strategy percentage"
                radius="sm"
                labelPlacement="outside"
                placeholder="Enter your monthly saving strategy percentage"
                validationState={
                  errors.monthlySavingStrategies?.[index]?.percentage
                    ? "invalid"
                    : "valid"
                }
                errorMessage={
                  errors.monthlySavingStrategies?.[index]?.percentage?.message
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">%</span>
                  </div>
                }
              />
            </div>
          </div>
        </Collapse>
      ))}
    </div>
  );
};
