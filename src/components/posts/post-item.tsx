import { Post } from "@/types"
import Link from "next/link";

type PostCardProps = {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  return (
    <div key={post.id} className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="mt-2">{post.body}</p>
        <div className="card-actions justify-end">
          <button onClick={handleDelete} className="btn">Delete</button>
          <Link href={`/c/` + post.id} className="btn">Comments</Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard