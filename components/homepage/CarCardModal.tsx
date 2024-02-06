"use client";

import { MouseEvent, useState } from "react";

import { dummyCarData } from "@/constants";
import CarModalScreenOne from "./CarModalScreenOne";

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

  return (
    <div
      className="flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-black/40 p-2 px-3 pt-6 dark:bg-black/30 lg:p-4"
      onClick={handleClose}
    >
      {showModalScreenTwo ? (
        <div>content</div>
      ) : (
        <CarModalScreenOne
          data={dummyCarData}
          handleClick={handleClick}
          handleClose={handleClose}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default CarCardModal;
