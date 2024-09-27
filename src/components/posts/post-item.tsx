import { Post } from "@/types"

type PostItemProps = {
  post: Post
}

function PostItem({ post }: PostItemProps) {
  return (
    <div key={post.id} className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="mt-2">{post.body}</p>
      </div>
    </div>
  )
}

export default PostItem