"use client";

import { MouseEvent, useState } from "react";

import { dummyCarData } from "@/constants";
import CarModalScreenOne from "./CarModalScreenOne";
import CarModalScreenTwo from "./CarModalScreenTwo";

const CarCardModal = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const [showModalScreenTwo, setShowModalScreenTwo] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleButtonClick = () => {
    setShowModalScreenTwo(true);
    console.log("Button clicked");
  };

  const handleClose = () => {
    handleCloseModal();
    setShowModalScreenTwo(false);
  };

  const modalProps = {
    data: dummyCarData,
    handleClick,
    handleClose,
    handleButtonClick,
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-center overflow-auto bg-black/40 p-2 px-3 pt-48 dark:bg-black/30 lg:px-4"
      onClick={handleClose}
    >
      {showModalScreenTwo ? (
        <CarModalScreenTwo {...modalProps} />
      ) : (
        <CarModalScreenOne {...modalProps} />
      )}
    </div>
  );
};

export default CarCardModal;
