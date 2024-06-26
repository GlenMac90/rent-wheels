export const navBarLinks = [
  {
    name: "Home",
    page: "/",
    icon: "/icons/home-page.svg",
    path: "/",
  },
  {
    name: "Search",
    page: "/search",
    icon: "/icons/search-page.svg",
    path: "/search?maxPrice=400",
  },
  {
    name: "Add Car",
    page: "/cars/new",
    icon: "/icons/add-car-page.svg",
    path: "/cars/new",
  },
];

export const dummyCarData = {
  name: "Skoda Octavia",
  type: "Sedan",
  image: "/dummy-images/dummy-car.png",
  description:
    "The Skoda Octavia is a small family car produced by the Czech car manufacturer Skoda Auto since 1996. It shares its name with an earlier model.",
  galleryImages: [
    "/dummy-images/dummy-car-one.png",
    "/dummy-images/dummy-car-two.png",
    "/dummy-images/dummy-car-three.png",
  ],
  fuelCapacity: 50,
  transmission: "Manual",
  capacity: 5,
  price: 99,
};

export const carTypes = [
  {
    id: "sport",
    label: "Sport",
  },
  {
    id: "suv",
    label: "SUV",
  },
  {
    id: "mpv",
    label: "MPV",
  },
  {
    id: "sedan",
    label: "Sedan",
  },
  {
    id: "coupe",
    label: "Coupe",
  },
  {
    id: "hatchback",
    label: "Hatchback",
  },
];

export const carCapacity = [
  {
    id: 2,
    label: "2 Persons",
  },
  {
    id: 4,
    label: "4 Persons",
  },
  {
    id: 6,
    label: "6 Persons",
  },
  {
    id: 8,
    label: "8 Persons or More",
  },
];

export const carTransmission = [
  {
    id: "auto",
    label: "Automatic",
  },
  {
    id: "manual",
    label: "Manual",
  },
];

export const profileDummyData = {
  name: "John Doe",
  jobTitle: "Software Engineer",
  profileImage: "/dummy-images/dummy-profile-image.jpg",
  bannerImage: "/dummy-images/dummy-banner-image.webp",
};

export const successPageData = {
  success: {
    heading: "Thank you for your purchase!",
    icon: "/payment-status/payment-success.png",
    message: "Payment Successful",
  },
  failed: {
    heading: "There was an error making payment",
    icon: "/payment-status/payment-failed.png",
    message: "Payment Unseccessful.",
  },
  cancelled: {
    heading: "You cancelled the payment",
    icon: "/payment-status/payment-cancelled.png",
    message: "Payment Cancelled",
  },
};
