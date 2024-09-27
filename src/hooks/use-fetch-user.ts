import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUser } from "@/utils";
import { User } from "@/types";

export function useFetchUser(userId: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      console.log(`Fetching user with id: ${userId}`);
      return fetchUser(userId);
    },
    initialData: () => {
      const users: User[] | undefined = queryClient.getQueryData<User[]>(['users'])
      const user: User | undefined = users?.find((user: User) => user.id === userId) || undefined
      return user
    },
    //staleTime: 1200
  })
}