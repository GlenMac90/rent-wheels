"use client";

import { seedDB } from "@/db/seed";
import { deleteAllCars } from "@/lib/actions/car.actions";
import { deleteNonAdmins } from "@/lib/actions/user.actions";

const page = () => {
  const seed = async () => {
    await seedDB();
  };

  const deleteCars = async () => {
    await deleteAllCars();
  };

  const deleteOtherUsers = async () => {
    await deleteNonAdmins();
  };

  return (
    <div className="flex-center h-screen w-screen">
      <div className="flex flex-col gap-4 rounded-xl p-10">
        <button
          className="rounded-md bg-blue-300 px-4 py-2 text-lg"
          onClick={seed}
        >
          Seed Database
        </button>
        <button
          className="rounded-md bg-blue-300 px-4 py-2 text-lg"
          onClick={deleteCars}
        >
          Delete All Cars
        </button>
        <button
          className="rounded-md bg-blue-300 px-4 py-2 text-lg"
          onClick={deleteOtherUsers}
        >
          Delete Other Users
        </button>
      </div>
    </div>
  );
};

export default page;
