import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { validateRegistration } from "./validation";

export async function POST(req: Request) {
  await dbConnect();
  const payload = await req.json();

  const { errors } = await validateRegistration(payload);

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  await User.create({
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });

  return NextResponse.json({ status: "ok" });
}
