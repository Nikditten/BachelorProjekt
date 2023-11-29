import { IUser } from ".";

export interface IWebsite {
  id: string;
  key: string;
  isAdmin: boolean;
  name: string;
  url: string;
  sharedWith?: IUser[];
  //   sessions: ISession[];
}
