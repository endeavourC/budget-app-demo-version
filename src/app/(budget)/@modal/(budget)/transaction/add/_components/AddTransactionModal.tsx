"use client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { AddTransactionForm } from "./AddTransactionForm";
import { FC } from "react";
import { AvailableCurrencies } from "@/common/components/CurrencySelect/types/currencies";
import { Types } from "mongoose";
import { EntityID } from "@/types/types";
import { IExpenseCategory } from "@/models/ExpenseCategory";

interface IProps {
  currency: AvailableCurrencies;
  walletId: EntityID;
  categories: IExpenseCategory[];
}

export const AddTransactionModal: FC<IProps> = ({
  currency,
  walletId,
  categories,
}) => {
  const router = useRouter();
  const { isOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: true,
    onClose: () => {
      router.back();
    },
  });

  return (
    <Modal
      backdrop="blur"
      isDismissable={true}
      hideCloseButton
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      size="4xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Adding Transaction
        </ModalHeader>
        <ModalBody>
          <AddTransactionForm
            onClose={onClose}
            currency={currency}
            walletId={walletId}
            categories={categories}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
