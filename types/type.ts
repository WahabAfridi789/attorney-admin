export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[];
};

export type City = {
  zips: string[];
  city: string;
  state_id: string;
  state_name: string;
  county_fips: string;
  county_name: string;
  lat: number;
  lng: number;
  population: number;
  density: number;
  timezone: string;
  ranking: number;
  id: string;
};
export type Attorney = {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  website?: string;
  image?: string;
  id: string;
};

export type Article = {
  id: string;
  title: string;
  author: string;
  body: string;
  cityId: {
    city: string;
    id: string;
  }; // Assuming cityId is an object in the frontend
};

export type FAQ = {
  question: string;
  answer: string;
  cityId: string; // Assuming cityId is a string in the frontend
};

export type Review = {
  rating: string;
  review: string;
  name: string;
};
