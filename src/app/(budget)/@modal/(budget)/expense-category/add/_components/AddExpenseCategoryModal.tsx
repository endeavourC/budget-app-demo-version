"use client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FC } from "react";
import { AddExpenseCategoryForm } from "./AddExpenseCategoryForm";
import { Types } from "mongoose";

interface IProps {
  walletId: Types.ObjectId;
}

export const AddExpenseCategoryModal: FC<IProps> = ({ walletId }) => {
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
          Adding Expense Category
        </ModalHeader>
        <ModalBody>
          <AddExpenseCategoryForm walletId={walletId} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
