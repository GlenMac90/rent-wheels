import ProfileCarsForRent from "@/components/profile/ProfileCarsForRent";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import ProfileRentedCars from "@/components/profile/ProfileRentedCars";
import Button from "@/components/Button";
import { getProfilePageCars } from "@/lib/actions/user.actions";

const Profile = async () => {
  const { rentedCars, ownedCars, profileData } = await getProfilePageCars();

  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <h3 className="semibold-20 text-gray-900_white w-full">Profile</h3>
        <ProfilePageHeader data={profileData} />
        <ProfileRentedCars cars={rentedCars} />
        <ProfileCarsForRent cars={ownedCars} />
        <Button height="h-14" width="w-full md:w-56" linkPath="/cars/new">
          Add Cars For Rent
        </Button>
      </section>
    </main>
  );
};

export default Profile;
