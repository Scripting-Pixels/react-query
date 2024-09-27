export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
  }
}

export type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
};