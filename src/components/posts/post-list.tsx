'use client'

import { useParams } from "next/navigation"

import PostCard from "./post-item"
import Loading from "@/components/ui/loading"
import DisplayError from "../display-error"
import useFetchPosts from "@/hooks/use-fetch-posts"

function PostList() {
  const params = useParams<{ userId: string }>()
  const {userId} = params

  const { 
    data: posts,
    isLoading,
    isError
  } = useFetchPosts(userId)
  
  return (
    <div>
      {isLoading && <Loading />}
      {isError && <DisplayError />}
      <ul className="space-y-4 w-full">
        {posts?.constructor === Array && posts?.map(post => (
          <li className="w-full" key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList