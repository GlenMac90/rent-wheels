"use client";

import { useState, MouseEvent, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";

const ProfileBannerEditButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClick = () => {
    setShowEditModal(!showEditModal);
  };

  const handleInnerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="flex-center base-10 md:base-14 absolute bottom-4 right-4 h-6 w-16 rounded-md bg-white/30 text-white md:bottom-6 md:right-10 md:h-10 md:w-28"
      >
        Edit Cover
      </button>
      {showEditModal && (
        <ModalBackground handleClose={handleClick}>
          <div
            className="bg-white_gray-850 flex h-fit w-full max-w-[500px] flex-col gap-8 rounded-ten px-4 py-8 md:p-8"
            onClick={handleInnerClick}
          >
            <div className="flex-between w-full">
              <div className="flex flex-col gap-2">
                <span className="text-gray-900_white bold-18 md:bold-20">
                  Edit Cover Image
                </span>
                <span className="base-14 text-gray-400">
                  Please select a new cover image
                </span>
              </div>
              <CloseButton handleClose={handleClick} />
            </div>
            <div className="flex w-full flex-col gap-5">
              <label className="semibold-14 md:semibold-16 text-gray-900_white">
                Upload Image
              </label>
              <div
                {...getRootProps()}
                className={`flex-center h-44 w-full flex-col rounded-ten border border-dashed border-gray-400 ${isDragActive && "bg-white-200_gray-800"}`}
              >
                <input
                  {...getInputProps()}
                  className="hidden"
                  ref={fileInputRef}
                />
                <button type="button" onClick={handleButtonClick}>
                  <FiUpload className="text-2xl text-blue-500" />
                </button>
                <p className="medium-14 text-gray-blue-100 mt-4">
                  Drag and drop an image, or{" "}
                  <span className="text-blue-500" onClick={handleButtonClick}>
                    Browse
                  </span>
                </p>
                <span className="base-14 text-gray-400_white-100 mt-2">
                  High resolution images (png, jpg, gif)
                </span>
              </div>
            </div>
          </div>
        </ModalBackground>
      )}
    </>
  );
};

export default ProfileBannerEditButton;
