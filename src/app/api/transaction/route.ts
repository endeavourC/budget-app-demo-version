import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";
import Transaction from "@/models/Transaction";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  await dbConnect();

  const payload = await request.json();

  console.log(payload);

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: "Forbidden",
      },
      { status: 403 }
    );
  }

  await Transaction.create({
    name: payload.name,
    amount: payload.amount,
    categoryId: payload.categoryId,
    walletId: payload.walletId,
  });

  revalidatePath("/");

  return NextResponse.json({ status: "ok" });
}
