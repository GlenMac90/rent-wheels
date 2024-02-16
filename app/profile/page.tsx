import ProfilePageHeader from "@/components/profile/ProfilePageHeader";

const Profile = () => {
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <h3 className="semibold-20 text-gray-900_white w-full">Profile</h3>
        <ProfilePageHeader />
      </section>
    </main>
  );
};

export default Profile;
