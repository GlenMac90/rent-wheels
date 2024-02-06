export const navBarLinks = [
  {
    name: "Home",
    icon: "/home-page.svg",
    path: "/",
  },
  {
    name: "Search",
    icon: "/search-page.svg",
    path: "/search",
  },
  {
    name: "Add Car",
    icon: "/add-car-page.svg",
    path: "/cars/new",
  },
];

export const dummyCarData = {
  name: "Skoda Octavia",
  type: "Sedan",
  image: "/dummy-car.png",
  description:
    "The Skoda Octavia is a small family car produced by the Czech car manufacturer Skoda Auto since 1996. It shares its name with an earlier model.",
  galleryImages: [
    "/dummy-car-one.png",
    "/dummy-car-two.png",
    "/dummy-car-three.png",
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
    id: "2",
    label: "2 Persons",
  },
  {
    id: "4",
    label: "4 Persons",
  },
  {
    id: "6",
    label: "6 Persons",
  },
  {
    id: "8",
    label: "8 Persons or More",
  },
];
