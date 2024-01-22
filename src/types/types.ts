import { IExpenseCategory } from "@/models/ExpenseCategory";
import { Types } from "mongoose";

export type EntityID = Types.ObjectId;

export type CategoryWithTotal = IExpenseCategory & { total: number };

export type SearchParams = {
  [key: string]: string | string[];
};
