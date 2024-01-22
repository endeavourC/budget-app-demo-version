import { getMonthRange } from "@/utils/getMonthRange";
import dbConnect from "@/lib/db";
import Transaction, { ITransaction } from "@/models/Transaction";
import { addDays } from "date-fns";
import { Types } from "mongoose";
import { EntityID } from "@/types/types";

export default class TransactionService {
  static getLatestTransactionsByWalletId = async (
    walletId: Types.ObjectId,
    limit: number = 10
  ): Promise<ITransaction[]> => {
    await dbConnect();
    const transactions: ITransaction[] = await Transaction.find({
      walletId,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    return transactions;
  };

  static getTransactionsSumByCategoryIdAndDate = async (
    type: "income" | "expense" = "expense",
    dateRange: { startDate: Date; endDate: Date } = getMonthRange(),
    categoryId: EntityID
  ): Promise<number> => {};

  static getTransactionsSumByWalletIdAndDate = async (
    type: "income" | "expense" = "expense",
    dateRange: { startDate: Date; endDate: Date } = getMonthRange(),
    walletId: EntityID
  ): Promise<number> => {
    await dbConnect();

    const sumOfTransactions = await Transaction.aggregate([
      {
        $match: {
          type: type,
          createdAt: {
            $gte: dateRange.startDate,
            $lt: addDays(dateRange.endDate, 1),
          },
          walletId: new Types.ObjectId(walletId),
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    return sumOfTransactions.length > 0 ? sumOfTransactions[0].total : 0;
  };
}
