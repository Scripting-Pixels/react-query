import PostList from "@/components/posts/post-list";
import BackBtn from "@/components/ui/back-btn";
import PostForm from "@/containers/forms/post";

export default function PostsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <BackBtn />
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>
      <div className="mb-3">
        <PostForm />
      </div>
      <PostList />
    </div>
  );
}
