import { NextParams } from "@/types/NextParams";
import Home from "../../page";

export default async function AddExpenseCategory({ ...props }: NextParams) {
  return <Home {...props} />;
}
