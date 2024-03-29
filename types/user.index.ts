export interface CreateUserDataProps {
  userData: {
    username: string;
    email: string;
    password: string;
    name: string;
  };
}

export interface UpdateUserDataProps {
  userEmail: string;
  userData: {
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    image?: string;
    bannerImage?: string;
    rentedCars?: string[];
    ownedCars?: string[];
  };
}

export interface SignInDataProps {
  email: string;
  password: string;
}

export interface ProfilePageHeaderProps {
  image: string;
  bannerImage: string;
  name: string;
  role: string;
}

export interface ProfileInfoEditButtonProps {
  profileImage: string;
  name: string;
  role: string;
}
