import mongoose, { Document, Types } from "mongoose";

export interface IExpenseCategory extends Document<Types.ObjectId> {
  name: string;
  color: string;
  icon: string;
  walletId: Types.ObjectId;
}

const ExpenseCategory = new mongoose.Schema<IExpenseCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#000000",
    },
    icon: {
      type: String,
      required: true,
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ExpenseCategory ||
  mongoose.model("ExpenseCategory", ExpenseCategory);
