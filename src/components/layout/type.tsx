import { UserType } from "../type";

export type LayoutType = {
  children?: React.ReactNode;
};

export type PresenterType = {
  children?: React.ReactNode;
  user: UserType;
};
