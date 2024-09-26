export type User = {
  id: number;
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
  id: number;
  title: string;
  body: string;
};