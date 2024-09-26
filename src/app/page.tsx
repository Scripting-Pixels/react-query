import UserList from "@/components/users/user-list"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserList />
    </div>
  );
}
