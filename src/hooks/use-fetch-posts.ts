import { useQuery } from "@tanstack/react-query"

import { fetchPosts } from "@/utils"

function useFetchPosts(userId: string) {
  return useQuery(
    ['posts', userId],
    () => fetchPosts(userId),
    {
      enabled: !!userId
    }
  )
}

export default useFetchPosts