import { UserType } from "../type";

export type PresenterType = {
  logout: () => void;
  user: UserType;
};
