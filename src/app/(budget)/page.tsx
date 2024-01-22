import WalletBasicInfo from "./_components/WalletBasicInfo";
import WalletService from "@/services/WalletService";
import BudgetSummary from "./_components/BudgetSummary";
import { Suspense } from "react";
import { Skeleton } from "@/common/components/Skeleton/Skeleton";
import { NextParams } from "@/types/NextParams";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import MostExpensiveCategories from "./_components/MostExpensiveCategories";

export default async function Home({ searchParams }: NextParams) {
  const wallet = await WalletService.getWallet();

  if (!wallet && headers().get("x-invoke-path") !== "/wallet/create") {
    redirect("/wallet/create");
  }

  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <WalletBasicInfo name={wallet.name} walletId={wallet.id} />
      </Suspense>

      <Suspense fallback={<Skeleton className="mt-16" />}>
        <BudgetSummary walletId={wallet.id} searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<Skeleton className="mt-16" />}>
        <MostExpensiveCategories
          walletId={wallet.id}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
