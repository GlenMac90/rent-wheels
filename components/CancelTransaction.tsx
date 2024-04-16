"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "./Button";

import { cancelTransaction } from "@/lib/actions/transaction.actions";

const CancelTransaction = ({ transactionId }: { transactionId: string }) => {
  const [isRendered, setIsRendered] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCancel = async () => {
    try {
      await cancelTransaction(transactionId);
      toast({
        variant: "info",
        title: "Transaction Cancelled!",
      });
      router.push("/checkout/cancelled");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete car",
      });
    }
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="p-3" deleteButton>
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white_gray-850 flex flex-col rounded-ten p-4">
        <p className="semibold-12 lg:semibold-20 text-gray-700_white-200">
          Cancel Transaction?
        </p>
        <Button width="w-full" height="h-10" handleClick={handleCancel}>
          Yes
        </Button>
        <DialogClose className="w-full">
          <Button deleteButton className="h-10 w-full">
            No
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CancelTransaction;
