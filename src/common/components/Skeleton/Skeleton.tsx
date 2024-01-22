"use client";
import { Skeleton as SkeletonLoader } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

export const Skeleton: React.FC<IProps> = ({ className }) => {
  return (
    <SkeletonLoader className={twMerge("rounded-lg", className)}>
      <div className="h-24 rounded-lg bg-default-300"></div>
    </SkeletonLoader>
  );
};
