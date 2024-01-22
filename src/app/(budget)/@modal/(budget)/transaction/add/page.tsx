import { AvailableCurrencies } from "@/common/components/CurrencySelect/types/currencies";
import WalletService from "@/services/WalletService";
import { AddTransactionModal } from "./_components/AddTransactionModal";
import ExpenseCategoryService from "@/services/ExpenseCategoryService";

export default async function AddTransaction() {
  const { currency, id } = await WalletService.getWallet();

  const categories = JSON.parse(
    JSON.stringify(await ExpenseCategoryService.getCategoriesByWalletId(id))
  );

  return (
    <AddTransactionModal
      currency={currency as AvailableCurrencies}
      walletId={id}
      categories={categories}
    />
  );
}
