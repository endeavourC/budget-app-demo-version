import WalletService from "@/services/WalletService";
import { AddExpenseCategoryModal } from "./_components/AddExpenseCategoryModal";
import { Suspense } from "react";

export default async function AddExpenseCategory() {
  const { id } = await WalletService.getWallet();

  return <AddExpenseCategoryModal walletId={id} />;
}
