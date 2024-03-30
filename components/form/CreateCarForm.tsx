"use client";

import {
  useCallback,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import Button from "../Button";
import { carFormSchema, CarFormFields } from "@/schemas";
import { useUploadThing } from "@/utils/uploadthing";
import { createCar, updateCar } from "@/lib/actions/car.actions";
import { ImageDataArrayType } from "@/types/car.index";
import { getBlurData } from "@/lib/actions/image.actions";
import { ICar } from "@/lib/models/car.model";
import { imageURLToFile } from "@/utils";
import { FormRow, FormPreviewImages } from ".";
import CarTitleField from "./CarTitleField";
import CarTypeField from "./CarTypeField";
import CarRentField from "./CarRentField";
import CarCapacityField from "./CarCapacityField";
import CarTransmissionField from "./CarTransmissionField";
import CarLocationField from "./CarLocationField";
import CarFuelField from "./CarFuelField";
import CarDescriptionField from "./CarDescriptionField";

const CreateCarForm = ({ editCarData }: { editCarData?: ICar }) => {
  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submittingForm, setSubmittingForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadThing("media");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CarFormFields>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      carTitle: editCarData?.name,
      carType: editCarData?.type,
      carDescription: editCarData?.description,
      transmission: editCarData?.transmission,
      fuelCapacity: editCarData?.fuelCapacity,
      capacity: editCarData?.peopleCapacity,
      rentPrice: editCarData?.dailyPrice,
    },
  });

  const imageUrlStrings = useMemo(() => {
    return imageFiles.map((file) => URL.createObjectURL(file));
  }, [imageFiles]);

  const formValues = watch();

  const onSubmit: SubmitHandler<CarFormFields> = async (data) => {
    const imageDataArray: ImageDataArrayType[] = [];
    const hasImageChanged = true;

    try {
      setSubmittingForm(true);
      if (imageFiles.length > 0 && hasImageChanged) {
        const uploadPromises = imageFiles.map((file) => startUpload([file]));

        try {
          const uploadResults = await Promise.all(uploadPromises);
          for (const imgRes of uploadResults) {
            if (imgRes && imgRes[0].url) {
              const { blurDataURL, width, height } = await getBlurData(
                imgRes[0].url
              );
              imageDataArray.push({
                url: imgRes[0].url,
                blurDataURL,
                width,
                height,
              });
            }
          }
        } catch (error) {
          console.error("Failed to upload images:", error);
        }
      }

      const carData = {
        name: data.carTitle,
        type: data.carType,
        description: data.carDescription,
        transmission: data.transmission,
        fuelCapacity: data.fuelCapacity,
        peopleCapacity: data.capacity,
        dailyPrice: data.rentPrice,
        imageData: imageDataArray,
      };

      if (editCarData) {
        await updateCar({ carData, carId: editCarData.id, path });
      } else {
        await createCar({ carData });
      }

      toast({
        variant: "info",
        title: "Car created successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create car",
      });
    } finally {
      setSubmittingForm(false);
    }
  };

  const imageLimitToast = () => {
    toast({
      variant: "destructive",
      title: "Maximum images reached",
      description: "You can only upload a maximum of 3 images",
    });
  };

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (!editCarData || !editCarData.imageData) return;

      const imageAsFiles = await Promise.all(
        editCarData.imageData.map(async (image) => {
          return imageURLToFile({ imageURL: image.url });
        })
      );
      const validFiles = imageAsFiles.filter(
        (file): file is File => file !== null
      );
      setImageFiles(validFiles);
    };
    fetchAndConvertImages();
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length > 3) {
        imageLimitToast();
      }
      acceptedFiles.slice(0, 3).forEach((file: any) => {
        if (!file.type.startsWith("image")) {
          toast({
            variant: "destructive",
            title: "Invalid file type",
            description: "Please upload an image file",
          });
          return;
        }
        if (imageUrlStrings.length >= 3) {
          imageLimitToast();
          return;
        }
        setImageFiles((prev) => [...prev, file]);
      });
    },
    [imageFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageDelete = (index: number) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      toast({
        variant: "info",
        title: "Image removed",
      });
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };
  };

  return (
    <form
      className="bg-white_gray-850 h-fit w-full max-w-[53.25rem] rounded-ten p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="semibold-20 text-gray-900_white">Add a Car for Rent</h3>
      <span className="base-14 mt-2.5 flex text-gray-400">
        Please enter your car info
      </span>
      <h4 className="extrabold-18 mt-9 text-blue-300">CAR INFO</h4>
      <FormRow>
        <CarTitleField
          errors={errors.carTitle?.message}
          register={register}
          carTitle={formValues.carTitle}
        />
        <CarTypeField
          errors={errors.carType?.message}
          carType={formValues.carType}
          setValue={setValue}
        />
      </FormRow>
      <FormRow>
        <CarRentField
          errors={errors.rentPrice?.message}
          rentPrice={formValues.rentPrice}
          setValue={setValue}
        />
        <CarCapacityField
          errors={errors.capacity?.message}
          capacity={formValues.capacity}
          setValue={setValue}
        />
      </FormRow>
      <FormRow>
        <CarTransmissionField
          errors={errors.transmission?.message}
          transmission={formValues.transmission}
          setValue={setValue}
        />
        <CarLocationField
          errors={errors.location?.message}
          register={register}
          location={formValues.location}
        />
      </FormRow>
      <FormRow>
        <CarFuelField
          errors={errors.fuelCapacity?.message}
          fuelCapacity={formValues.fuelCapacity}
          setValue={setValue}
        />
        <CarDescriptionField
          errors={errors.carDescription?.message}
          carDescription={formValues.carDescription}
          register={register}
        />
      </FormRow>

      {imageUrlStrings && imageUrlStrings.length > 0 && (
        <FormPreviewImages
          imageUrlStrings={imageUrlStrings}
          handleImageDelete={handleImageDelete}
        />
      )}

      <div className="mt-6 flex w-full flex-col gap-5">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Upload Image
        </label>
        <div
          {...getRootProps()}
          className={`flex-center h-44 w-full flex-col rounded-ten border border-dashed border-gray-400 px-4 ${isDragActive && "bg-white-200_gray-800"}`}
        >
          <input {...getInputProps()} className="hidden" ref={fileInputRef} />
          <button type="button" onClick={handleButtonClick}>
            <FiUpload className="text-2xl text-blue-500" />
          </button>
          <p className="medium-14 text-gray-blue-100 mt-4 text-center">
            Drag and drop an image, or{" "}
            <span
              className="cursor-pointer text-blue-500"
              onClick={handleButtonClick}
            >
              Browse
            </span>
          </p>
          <span className="base-14 text-gray-400_white-100 mt-2 text-center">
            High resolution images (png, jpg, gif)
          </span>
        </div>
      </div>

      <Button
        width="w-full md:w-fit md:px-4"
        height="h-12"
        className="mt-8"
        submit
        disabled={submittingForm}
      >
        {submittingForm
          ? editCarData
            ? "Updating Car..."
            : "Creating Car..."
          : editCarData
            ? "Update Car"
            : "Create Car"}
      </Button>
    </form>
  );
};

export default CreateCarForm;
