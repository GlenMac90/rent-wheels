"use client";

import { useCallback, useState, MouseEvent, useEffect, useMemo } from "react";
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
import { getBlurData, deleteFiles } from "@/lib/actions/image.actions";
import { ICar } from "@/lib/models/car.model";
import { imageURLToFile } from "@/utils";
import {
  FormRow,
  FormPreviewImages,
  CarCapacityField,
  CarDescriptionField,
  CarFuelField,
  CarLocationField,
  CarRentField,
  CarTitleField,
  CarTransmissionField,
  CarTypeField,
} from ".";
import CarDeleteButton from "./CarDeleteButton";

const CreateCarForm = ({ editCarData }: { editCarData?: ICar }) => {
  console.log(editCarData);
  const { toast } = useToast();
  const router = useRouter();
  const path = usePathname();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CarFormFields>({
    resolver: zodResolver(carFormSchema),

    // Default values for edit car page, if editCarData is present

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

  // Memoised value below to auto generate image URLs

  const imageUrlStrings = useMemo(() => {
    return imageFiles.map((file) => URL.createObjectURL(file));
  }, [imageFiles]);

  const formValues = watch();

  // Submit handler

  const onSubmit: SubmitHandler<CarFormFields> = async (data) => {
    const imageDataArray: ImageDataArrayType[] = [];

    // Check if images have changed
    const imagesHaveChanged =
      imageFiles.some((image) => "path" in image) ||
      (editCarData && imageFiles?.length < editCarData.imageData.length);

    try {
      // Delete old images if they have changed
      if (
        imagesHaveChanged &&
        editCarData &&
        editCarData?.imageData.length > 0
      ) {
        const imagesToDelete = editCarData?.imageData.map((image) => image.key);
        await deleteFiles(imagesToDelete);
      }
      // Upload new images

      if (imageFiles.length > 0) {
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
                key: imgRes[0].key,
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

      // Car data object

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

      // Create or update car data

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
      console.log("error", error);
      toast({
        variant: "destructive",
        title: "Failed to create car",
      });
    }
  };

  // Image limit toast

  const imageLimitToast = () => {
    toast({
      variant: "destructive",
      title: "Maximum images reached",
      description: "You can only upload a maximum of 3 images",
    });
  };

  // Find images for edit car page

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

  // Dropzone onDrop function

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles.length > 3 ||
        imageFiles.length >= 3 ||
        acceptedFiles.length + imageFiles.length > 3
      ) {
        imageLimitToast();
      }
      const amountToSlice = 3 - imageFiles.length;
      acceptedFiles.slice(0, amountToSlice).forEach((file: File) => {
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
    [imageFiles, imageUrlStrings]
  );

  // Dropzone hook

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Image delete function

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

  // Button text

  const buttonText = isSubmitting
    ? editCarData
      ? "Updating Car..."
      : "Creating Car..."
    : editCarData
      ? "Update Car"
      : "Create Car";

  return (
    <form
      className="bg-white_gray-850 h-fit w-full max-w-[53.25rem] rounded-ten p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="semibold-20 text-gray-900_white">Add a Car for Rent</h3>
      <span className="base-14 mt-2.5 flex text-gray-400">
        Please enter your car info
      </span>
      <h4 className="extrabold-18 mt-9 text-purple-mid">CAR INFO</h4>

      {/* Form Fields Below Organise into rows */}

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

      {/* Image preview for dropped images */}

      {imageUrlStrings && imageUrlStrings.length > 0 && (
        <FormPreviewImages
          imageUrlStrings={imageUrlStrings}
          handleImageDelete={handleImageDelete}
        />
      )}

      {/* Dropzone for image upload */}

      <div className="mt-6 flex w-full flex-col gap-5">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Upload Image
        </label>
        <div
          {...getRootProps()}
          className={`flex-center h-44 w-full flex-col rounded-ten border border-dashed border-gray-400 px-4 ${isDragActive && "bg-white-200_gray-800"}`}
        >
          <input {...getInputProps()} className="hidden" />
          <button type="button">
            <FiUpload className="text-2xl text-purple" />
          </button>
          <p className="medium-14 text-gray-blue-100 mt-4 text-center">
            Drag and drop an image, or{" "}
            <span className="cursor-pointer text-purple">Browse</span>
          </p>
          <span className="base-14 text-gray-400_white-100 mt-2 text-center">
            High resolution images (png, jpg, gif)
          </span>
        </div>
      </div>

      <div className="flex-between w-full">
        {/* Submit Button */}

        <Button
          width="w-full md:w-fit md:px-4"
          height="h-12"
          className="mt-8"
          submit
          disabled={isSubmitting}
        >
          {buttonText}
        </Button>

        {editCarData && (
          // Delete Button for edit car page

          <CarDeleteButton carId={editCarData.id.toString()} />
        )}
      </div>
    </form>
  );
};

export default CreateCarForm;
