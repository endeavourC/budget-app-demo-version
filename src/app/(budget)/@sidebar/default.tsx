import { AddButton } from "@/common/components/AddButton/AddButton";
import ExpenseCategoryService from "@/services/ExpenseCategoryService";
import WalletService from "@/services/WalletService";
import Link from "next/link";

export default async function Default() {
  const wallet = await WalletService.getWallet();

  if (!wallet) return null;

  const categories = await ExpenseCategoryService.getCategoriesByWalletId(
    wallet.id
  );

  return (
    <aside className="px-9 mt-[240px]">
      <div className="flex items-center justify-between">
        <h2 className="text-black font-semibold text-xl my-4">Categories</h2>
        <Link href="/expense-category/add">
          <AddButton />
        </Link>
      </div>
      <div className="flex flex-col"></div>
    </aside>
  );
}
