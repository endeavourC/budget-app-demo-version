import { NextParams } from "@/types/NextParams";
import Home from "../../page";

export default async function AddTransaction({ ...props }: NextParams) {
  return <Home {...props} />;
}
