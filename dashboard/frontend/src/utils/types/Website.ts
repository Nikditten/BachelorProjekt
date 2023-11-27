import { IUser } from ".";

export interface IWebsite {
  id: string;
  isAdmin: boolean;
  name: string;
  url: string;
  sharedWith?: IUser[];
  //   sessions: ISession[];
}
