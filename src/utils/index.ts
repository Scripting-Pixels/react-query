import { Post, User } from "@/types";

export const fetchUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER}/users`)
  await new Promise((resolve) => setTimeout(resolve, 1200))
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
};

export const fetchPosts = async (userId: string): Promise<Post[]> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_SERVER}/posts?userId=${userId}`
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json()
};

export async function updatePosts(newPost: Post): Promise<Post> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER}/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await response.json()
  return json
}

export const fetchUser = async (userId: string): Promise<User> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_SERVER}/users?id=${userId}`
  const response = await fetch(url)
  // Show loading for 1200ms
  await new Promise((resolve) => setTimeout(resolve, 1200))
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const json: User[] = await response.json()
  const user: User = json[0]
  return user
};