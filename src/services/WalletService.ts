import dbConnect from "@/lib/db";
import Wallet, { IWallet } from "@/models/Wallet";
import { getAuthSession } from "@/utils/getAuthSession";

export default class WalletService {
  static getWallet = async (walletId?: number): Promise<IWallet> => {
    await dbConnect();
    const session = await getAuthSession();
    const wallet = await Wallet.findOne({
      userId: session.user.id,
      ...(walletId && { id: walletId }),
    });

    return wallet;
  };
}
