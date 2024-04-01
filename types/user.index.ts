import { ImageDataArrayType } from "./car.index";

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
    image?: ImageDataArrayType;
    bannerImage?: ImageDataArrayType;
    rentedCars?: string[];
    ownedCars?: string[];
  };
}

export interface SignInDataProps {
  email: string;
  password: string;
}

export interface ProfilePageHeaderProps {
  image: ImageDataArrayType;
  bannerImage: ImageDataArrayType;
  name: string;
  role: string;
}

export interface ProfileInfoEditButtonProps {
  profileImage: ImageDataArrayType;
  name: string;
  role: string;
}
