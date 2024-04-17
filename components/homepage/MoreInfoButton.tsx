"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

import { ICar } from "@/lib/models/car.model";
import Button from "../Button";
import { CarModalScreenTwo, CarModalScreenOne } from ".";

const MoreInfoButton = ({ data }: { data: ICar }) => {
  const { data: session } = useSession();
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

  if (!isRendered) {
    return (
      <Button height="h-11" width="w-[7.25rem]" disabled>
        More Info
      </Button>
    );
  }

  if (!session) {
    return (
      <Button height="h-11" width="w-[7.25rem]" linkPath="/sign-in">
        More Info
      </Button>
    );
  }

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger>
        <Button height="h-11" width="w-[7.25rem]">
          More Info
        </Button>
      </DialogTrigger>

      {/* Show modal one or modal two depending on position in sequence */}

      {showModalScreenTwo ? (
        <DialogContent className="flex w-full max-w-[31.25rem] p-0">
          <CarModalScreenTwo {...modalProps} carId={data.id} />
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
