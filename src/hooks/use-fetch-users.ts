import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/utils";

export function useFetchUsers() {
  return useQuery(
    ['users'],
    () => fetchUsers()
  )
}