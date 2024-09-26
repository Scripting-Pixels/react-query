'use client'

import { useFetchUsers } from "@/hooks/use-fetch-users"
import { User } from "@/types"
import Loading from "@/components/ui/loading"
import DisplayError from "@/components/display-error"
import UserItem from "./user-item"

function UserList() {
  const { 
    data: users,
    isLoading,
    isError
  } = useFetchUsers()

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <DisplayError />}
      <ul className="space-y-4">
        {users?.map((user: User) => (
          <UserItem user={user} key={user.id} />
        ))}
      </ul>
    </div>
  )
}

export default UserList