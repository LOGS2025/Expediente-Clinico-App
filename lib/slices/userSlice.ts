
export type UserSlice = {
  name: string;
  id_string: string;
  //joinedAt: dayjs.Dayjs;
  loggedIn: boolean;
  setName: (name: string) => void;
  //logIn: (authToken : string) => void;
  //logOut: () => void;
};