import ExpenseCategoryService from "@/services/ExpenseCategoryService";
import { CategoryWithTotal, EntityID, SearchParams } from "@/types/types";
import ExpenseCategoryTile from "./ExpenseCategoryTile";
import { Key } from "react";

interface Props {
  walletId: EntityID;
  searchParams: SearchParams;
}

export default async function MostExpensiveCategories({
  walletId,
  searchParams,
}: Props) {
  const dateObject = Object.entries(searchParams).length
    ? {
        startDate: new Date(searchParams.startDate as string),
        endDate: new Date(searchParams.endDate as string),
      }
    : undefined;

  const categories: CategoryWithTotal[] =
    await ExpenseCategoryService.getMostExpensiveCategories(
      walletId,
      10,
      dateObject
    );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-black">
        Categories with Biggest Expense
      </h2>

      <div className="grid grid-cols-6 gap-8 mt-8">
        {categories.map((category) => (
          <ExpenseCategoryTile
            key={category.id as unknown as Key}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
