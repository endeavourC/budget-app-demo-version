"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

export const Loader = () => {
  return (
    <div className="z-[10000000] w-full h-full left-0 top-0 bg-black/60 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
