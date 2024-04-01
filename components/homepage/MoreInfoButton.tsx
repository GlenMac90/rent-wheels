"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ICar } from "@/lib/models/car.model";
import Button from "../Button";
import CarModalScreenOne from "./CarModalScreenOne";
import CarModalScreenTwo from "./CarModalScreenTwo";

const MoreInfoButton = ({ data }: { data: ICar }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [showModalScreenTwo, setShowModalScreenTwo] = useState(false);

  const handleButtonClick = () => {
    setShowModalScreenTwo(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setShowModalScreenTwo(false);
    }, 100);
  };

  const modalProps = {
    data,
    handleClose,
    handleButtonClick,
  };

  // Show the modal after the component is rendered to avoid SSR issues

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered) return null;

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger>
        <Button height="h-11" width="w-[7.25rem]">
          More Info
        </Button>
      </DialogTrigger>
      {showModalScreenTwo ? (
        <DialogContent className="flex w-full max-w-[31.25rem] p-0">
          <CarModalScreenTwo {...modalProps} />
        </DialogContent>
      ) : (
        <DialogContent className="flex w-full max-w-[22.5rem] p-0 lg:max-w-5xl">
          <CarModalScreenOne {...modalProps} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default MoreInfoButton;
