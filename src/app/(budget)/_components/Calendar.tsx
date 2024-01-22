"use client";
import { useQueryParams } from "@/common/hooks/useQueryParams";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export const Calendar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { removeQueryParams, addQueryParams } = useQueryParams();

  const [value, setValue] = useState({
    startDate: params.get("startDate"),
    endDate: params.get("endDate"),
  });

  const onChange = (value: DateValueType) => {
    setValue(value);
    if (value?.startDate && value.endDate) {
      router.push(addQueryParams(value));
    } else {
      router.push(removeQueryParams(["startDate", "endDate"]));
    }
  };

  return (
    <Datepicker
      inputClassName="relative p-4 rounded-lg cursor-pointer"
      showShortcuts={true}
      containerClassName={"relative z-90 w-auto"}
      placeholder="Select date range"
      showFooter={true}
      value={value}
      onChange={onChange}
    />
  );
};
