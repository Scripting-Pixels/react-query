import BackBtn from "@/components/ui/back-btn";
import UserDetails from "@/components/users/user-details";

export default function UserPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <BackBtn />
        <h1 className="text-2xl font-bold">User</h1>
      </div>
      <UserDetails />
    </div>
  );
}
