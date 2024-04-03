import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import Button from "../Button";
import { deleteCar } from "@/lib/actions/car.actions";

const CarDeleteButton = ({ carId }: { carId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleClick = async () => {
    try {
      await deleteCar(carId);
      toast({
        variant: "info",
        title: "Car deleted successfully!",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete car",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          width="w-full md:w-fit px-4"
          height="h-12"
          className="mt-8"
          deleteButton
        >
          Delete Car
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white_gray-850 rounded-xl p-4">
        <div className="flex-between gap-4">
          <Button
            width="w-full md:w-fit md:px-4"
            height="h-12"
            handleClick={handleClick}
            deleteButton
          >
            Confirm Delete
          </Button>
          <DialogClose>
            <Button width="w-full md:w-fit md:px-4" height="h-12">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDeleteButton;
