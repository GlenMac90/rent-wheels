"use client";

import { MouseEvent, useState } from "react";

import ModalBackground from "../ModalBackground";
import CarModalScreenOne from "./CarModalScreenOne";
import CarModalScreenTwo from "./CarModalScreenTwo";
import { ICar } from "@/lib/models/car.model";

const CarCardModal = ({
  handleCloseModal,
  data,
}: {
  handleCloseModal: () => void;
  data: ICar;
}) => {
  const [showModalScreenTwo, setShowModalScreenTwo] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleButtonClick = () => {
    setShowModalScreenTwo(true);
  };

  const handleClose = () => {
    handleCloseModal();
    setShowModalScreenTwo(false);
  };

  const modalProps = {
    data,
    handleClick,
    handleClose,
    handleButtonClick,
  };

  return (
    <ModalBackground handleClose={handleClose}>
      {showModalScreenTwo ? (
        <CarModalScreenTwo {...modalProps} />
      ) : (
        <CarModalScreenOne {...modalProps} />
      )}
    </ModalBackground>
  );
};

export default CarCardModal;
