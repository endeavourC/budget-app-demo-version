import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  currency: string;
  themeColor: string;
}

export const BudgetSummaryInfoColumn: FC<IProps> = ({
  icon,
  title,
  amount,
  currency,
  themeColor,
}) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <div
        className={twMerge(
          "rounded-full w-16 h-16 shadow-lg flex items-center justify-center",
          themeColor
        )}
      >
        {icon}
      </div>
      <div className="flex items-start justify-start mt-4 font-semibold">
        <span className="text-sm mr-2">{currency}</span>
        <span className="text-2xl">{amount}</span>
      </div>
      <p className={twMerge("text-lg font-semibold mt-2", themeColor)}>
        {title}
      </p>
    </div>
  );
};
