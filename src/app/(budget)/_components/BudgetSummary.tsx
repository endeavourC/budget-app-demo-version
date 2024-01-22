import TransactionService from "@/services/TransactionService";
import { Types } from "mongoose";
import {
  MdOutlineMoneyOffCsred,
  MdOutlineAttachMoney,
  MdOutlineMoney,
} from "react-icons/md";
import { BudgetSummaryInfoColumn } from "./BudgetSummaryInfoColumn";
import WalletService from "@/services/WalletService";
import {
  AvailableCurrencies,
  getCurrencySymbolByValue,
} from "@/common/components/CurrencySelect/types/currencies";
import { SearchParams } from "@/types/types";

interface IProps {
  walletId: Types.ObjectId;
  searchParams: SearchParams;
}

export default async function BudgetSummary({
  walletId,
  searchParams,
}: IProps) {
  const { currency } = await WalletService.getWallet();

  const dateObject = Object.entries(searchParams).length
    ? {
        startDate: new Date(searchParams.startDate as string),
        endDate: new Date(searchParams.endDate as string),
      }
    : undefined;

  const data: [number, number] = await Promise.all([
    TransactionService.getTransactionsSumByWalletIdAndDate(
      "expense",
      dateObject,
      walletId
    ),
    TransactionService.getTransactionsSumByWalletIdAndDate(
      "income",
      dateObject,
      walletId
    ),
  ]);

  return (
    <section className="mt-8 rounded-xl shadow-sm bg-white p-8 flex items-center justify-start">
      <div className="w-full">
        <div className="grid grid-cols-3 gap-8">
          <BudgetSummaryInfoColumn
            title="Expenses"
            themeColor="text-danger"
            amount={-data[0]}
            currency={getCurrencySymbolByValue(currency as AvailableCurrencies)}
            icon={<MdOutlineMoneyOffCsred className=" text-3xl" />}
          />
          <BudgetSummaryInfoColumn
            title="Incomes"
            themeColor="text-success"
            amount={data[1]}
            currency={getCurrencySymbolByValue(currency as AvailableCurrencies)}
            icon={<MdOutlineAttachMoney className=" text-3xl" />}
          />{" "}
          <BudgetSummaryInfoColumn
            title="Balance"
            themeColor="text-primaryColor"
            amount={-data[0] - data[1]}
            currency={getCurrencySymbolByValue(currency as AvailableCurrencies)}
            icon={<MdOutlineMoney className=" text-3xl" />}
          />
        </div>
      </div>
      <div className="max-w-md w-full border-l-[1px] border-dashed border-gray-200 h-full">
        BudgetSummary
      </div>
    </section>
  );
}
