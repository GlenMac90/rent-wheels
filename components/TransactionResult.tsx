import Image from "next/image";

import { successPageData } from "@/constants";
import Button from "./Button";

const TransactionResult = ({
  status,
  transactionId,
}: {
  status: "success" | "failed" | "cancelled";
  transactionId?: string;
}) => {
  const { heading, icon, message } = successPageData[status];

  return (
    <div className="flex-center bg-white_gray-850 h-fit flex-col rounded-ten p-12">
      <span className="medium-18 text-gray-400">{heading}</span>
      <Image
        src={icon}
        alt={message}
        height={120}
        width={120}
        className="mt-10 shrink-0 md:mt-12"
      />
      <p className="bold-24 md:bold-32 text-gray-900_white mt-10 md:mt-12">
        {message}
      </p>
      {transactionId ? (
        <Button
          linkPath={`/transaction/${transactionId}`}
          width="w-full"
          height="h-14"
          className="mt-10"
        >
          {status === "success" ? "View Transaction" : "Try Again"}
        </Button>
      ) : (
        <Button linkPath="/" width="w-full" height="h-14" className="mt-10">
          Go Home
        </Button>
      )}
    </div>
  );
};

export default TransactionResult;
