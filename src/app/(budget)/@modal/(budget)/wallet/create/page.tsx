"use client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CreateWalletForm } from "./_components/CreateWalletForm";

export default function WalletCreateModal() {
  const router = useRouter();
  const { isOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: true,
    onClose: () => {
      router.replace("/");
    },
  });

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      hideCloseButton
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      size="4xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Wallet Creation
        </ModalHeader>
        <ModalBody>
          <p className="text-lg">
            You have not created any wallets yet. To run your virtual wallet
            first you have to create one!
          </p>
          <CreateWalletForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
