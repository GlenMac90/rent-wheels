import ProfileCarsForRent from "@/components/profile/ProfileCarsForRent";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import ProfileRentedCars from "@/components/profile/ProfileRentedCars";
import Button from "@/components/Button";

const Profile = () => {
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <h3 className="semibold-20 text-gray-900_white w-full">Profile</h3>
        <ProfilePageHeader />
        <ProfileRentedCars />
        <ProfileCarsForRent />
        <Button height="h-14" width="w-full md:w-56" linkPath="/cars/new">
          Add More Cars For Rent
        </Button>
      </section>
    </main>
  );
};

export default Profile;
