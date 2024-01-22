import React from "react";
import { FaWallet } from "react-icons/fa";
import { Calendar } from "./Calendar";
import { AddButton } from "@/common/components/AddButton/AddButton";
import Link from "next/link";
import { EntityID } from "@/types/types";
import ExpenseCategoryService from "@/services/ExpenseCategoryService";

interface IProps {
  name: string;
  walletId: EntityID;
}

export default async function WalletBasicInfo({ name, walletId }: IProps) {
  const categoriesCount =
    await ExpenseCategoryService.getCategoriesCountByWalletId(walletId);

  async function foo() {
    "use server";

    return {
      data: 5,
    };
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start">
        <FaWallet className="fill-primaryColor text-7xl" />
        <div className="block ml-4">
          <h2 className="text-primaryColor text-3xl font-medium">{name}</h2>
          <p className="mt-2 text-sm text-primary">Change default wallet</p>
        </div>
      </div>

      <div className="flex items-center justify-start">
        {categoriesCount ? (
          <Link className="mr-8" href="/transaction/add">
            <AddButton>+</AddButton>
          </Link>
        ) : null}

        <Calendar />
      </div>
    </div>
  );
}
