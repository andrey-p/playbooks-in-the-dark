type UserData = {
  id: string | undefined;
  systemId: string;
  playbookType: string;
  playbookId: string;
  [key: string]: unknown;
};

export default UserData;
