import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const AddButton: FC<IProps> = ({ className, ...props }) => {
  const classes =
    "bg-transparent flex items-center justify-center border-[1px] border-dashed border-primary w-12 h-12 text-primary rounded-2xl text-3xl hover:bg-white transition hover:border-white hover:shadow-lg hover:shadow-primary/20";

  return (
    <button {...props} className={twMerge(classes, className)}>
      +
    </button>
  );
};
