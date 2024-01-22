import dbConnect from "@/lib/db";
import Wallet from "@/models/Wallet";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  await dbConnect();
  const payload = await req.json();

  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      {
        error: "Forbidden",
      },
      { status: 403 }
    );

  await Wallet.create({
    name: payload.name,
    monthlySavingStrategies: payload.monthlySavingStrategies || [],
    balance: payload.balance,
    currency: payload.currency,
    userId: session.user.id,
  });

  return NextResponse.json({ status: "ok" });
}
