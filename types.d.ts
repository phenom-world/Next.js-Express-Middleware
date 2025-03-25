export type ObjectData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type User = {
  id: string;
  role: UserRole;
  email: string;
};

