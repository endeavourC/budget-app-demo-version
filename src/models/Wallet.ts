import mongoose, { Types } from "mongoose";

export interface IWallet {
  id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  monthlySavingStrategies: Array<{ name: string; percentage: number }>;
  balance: number;
  currency: string;
}

const Wallet = new mongoose.Schema<IWallet>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    monthlySavingStrategies: [
      {
        name: {
          type: String,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
      },
    ],
    balance: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "PLN",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Wallet || mongoose.model("Wallet", Wallet);
