import { redirect } from "next/navigation";
import { FaCheck } from "react-icons/fa";

import StripeCheckout from "@/components/StripeCheckout";
import { getTransactionById } from "@/lib/actions/transaction.actions";
import ImageGallery from "@/components/ImageGallery";
import { formatDate } from "@/utils";
import CancelTransaction from "@/components/CancelTransaction";

const Transaction = async ({ params }: { params: { id: string } }) => {
  const transaction = await getTransactionById(params.id);

  if (!transaction) {
    redirect("/");
  }

  const isPending = transaction.pending;

  const {
    name,
    type,
    description,
    transmission,
    fuelCapacity,
    peopleCapacity,
    imageData,
  } = transaction.carData;

  const { startDate, endDate } = transaction.rentalPeriod;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <main className="page-styles">
      <div className="bg-white_gray-850 relative flex h-fit w-full max-w-[22.5rem] flex-col gap-6 rounded-ten p-4 lg:max-w-5xl lg:flex-row lg:p-8">
        <ImageGallery imageData={imageData} />

        {/* Car Details */}

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1.5 lg:gap-2">
              <h2 className="bold-20 lg:bold-32 text-gray-900_white">{name}</h2>

              {/* Star Rating and number of reviews */}
            </div>
          </div>

          {/* Description */}

          <p className="light-12 lg:light-20 text-gray-700_white-200">
            {description}
          </p>

          {/* Car Details */}

          <div className="flex-between w-full gap-11">
            <div className="flex w-full flex-col gap-4">
              {/* Car Type */}

              <div className="flex-between w-full">
                <label className="light-12 lg:light-20 text-gray-400">
                  Type Car
                </label>
                <span className="base-12 lg:base-20 text-gray-700_white-200">
                  {type}
                </span>
              </div>

              {/* Transmission */}

              <div className="flex-between w-full">
                <label className="light-12 lg:light-20 text-gray-400">
                  Trans.
                </label>
                <span className="base-12 lg:base-20 text-gray-700_white-200 capitalize">
                  {transmission}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              {/* People Capacity */}

              <div className="flex-between w-full">
                <label className="light-12 lg:light-20 text-gray-400">
                  Capacity
                </label>
                <span className="base-12 lg:base-20 text-gray-700_white-200">
                  {peopleCapacity} Person
                </span>
              </div>

              {/* Fuel Capacity */}

              <div className="flex-between w-full">
                <label className="light-12 lg:light-20 text-gray-400">
                  Gasoline
                </label>
                <span className="base-12 lg:base-20 text-gray-700_white-200">
                  {fuelCapacity}L
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex w-full flex-col gap-2">
            <p className="light-12 lg:light-20 text-gray-400">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <div className="flex-between w-full">
              <p className="bold-20 lg:bold-28 text-gray-900_white">
                ${transaction.price}
              </p>
              {isPending ? (
                <div className="flex gap-4">
                  <StripeCheckout transaction={transaction} />
                  <CancelTransaction transactionId={transaction.id} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="bold-20 lg:bold-28 text-gray-900_white flex">
                    Confirmed
                  </p>
                  <FaCheck className="text-2xl text-green-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Transaction;
