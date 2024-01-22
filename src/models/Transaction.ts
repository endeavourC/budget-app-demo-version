import mongoose from "mongoose";
import { Types } from "mongoose";

export interface ITransaction {
  id: Types.ObjectId;
  name: string;
  categoryId: Types.ObjectId;
  walletId: Types.ObjectId;
  amount: number;
  type: "income" | "expense";
}

const Transaction = new mongoose.Schema<ITransaction>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      require: true,
      default: "expense",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", Transaction);
