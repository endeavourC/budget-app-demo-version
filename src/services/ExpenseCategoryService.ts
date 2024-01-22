import dbConnect from "@/lib/db";
import ExpenseCategory, { IExpenseCategory } from "@/models/ExpenseCategory";
import Transaction from "@/models/Transaction";
import { CategoryWithTotal, EntityID } from "@/types/types";
import { getMonthRange } from "@/utils/getMonthRange";
import { addDays } from "date-fns";
import { Types } from "mongoose";

export default class ExpenseCategoryService {
  static getCategoriesByWalletId = async (
    walletId: EntityID,
    limit: number = 10
  ): Promise<IExpenseCategory[]> => {
    await dbConnect();
    const categories: IExpenseCategory[] = await ExpenseCategory.find({
      walletId,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    return categories;
  };

  static getCategoriesCountByWalletId = async (
    walletId: EntityID
  ): Promise<number> => {
    await dbConnect();
    const categoriesCount: number = await ExpenseCategory.countDocuments({
      walletId,
    });

    return categoriesCount;
  };

  static getMostExpensiveCategories = async (
    walletId: EntityID,
    limit: number = 10,
    dateRange: { startDate: Date; endDate: Date } = getMonthRange()
  ): Promise<CategoryWithTotal[]> => {
    await dbConnect();

    const mostExpensiveCategories: CategoryWithTotal[] =
      await Transaction.aggregate([
        {
          $match: {
            type: "expense",
            walletId: new Types.ObjectId(walletId),
            createdAt: {
              $lt: addDays(dateRange.endDate, 1),
              $gte: dateRange.startDate,
            },
          },
        },
        {
          $group: {
            _id: "$categoryId",
            total: { $sum: "$amount" },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: "expensecategories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            id: "$category._id",
            _id: "$category._id",
            name: "$category.name",
            icon: "$category.icon",
            color: "$category.color",
            total: "$total",
          },
        },
      ]);

    return mostExpensiveCategories;
  };
}
