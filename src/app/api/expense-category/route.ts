import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import ExpenseCategory from "@/models/ExpenseCategory";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  await dbConnect();

  const { name, color, icon, walletId } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: "Forbidden",
      },
      { status: 403 }
    );
  }

  await ExpenseCategory.create({
    name,
    color,
    icon,
    walletId,
  });

  revalidatePath("/");

  return NextResponse.json({ status: "ok" });
}
