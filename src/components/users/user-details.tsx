'use client'

import { User } from "@/types"
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query"

import Loading from "@/components/ui/loading";
import DisplayError from "../display-error";

const fetchUser = async (userId: string): Promise<User> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_SERVER}/users?id=${userId}`
  const response = await fetch(url)
  // Show loading for 1200ms
  await new Promise((resolve) => setTimeout(resolve, 1200))
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const json: User[] = await response.json()
  const user: User = json[0]
  return user
};

function UserDetails() {
  const params = useParams()
  const userId = Array.isArray(params?.userId) ? params.userId[0] : params.userId
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return fetchUser(userId);
    },
    initialData: () => {
      const users: User[] | undefined = queryClient.getQueryData<User[]>(['users'])
      const user: User | undefined = users?.find((user: User) => user.id === userId) || undefined
      return user
    },
    //staleTime: 1200
  })
  
  return (
    <>
      {isLoading && <Loading />}
      {isError && <DisplayError />}
      {!user && !isLoading && <div>User not found!</div>}
      {
        user &&
          <div className="card bg-base-100">
            <div className="card-body flex flex-row items-center justify-between">
              <div className="space-y-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-16 rounded-full">
                    <span className="text-3xl">
                      {Array.from(user?.name)[0]}
                    </span>
                  </div>
                </div>
                <h2 className="card-title">{user.name}</h2>
                <p className="text-sm"><b>Email:</b> {user.email}</p>
                <p className="text-sm"><b>Company:</b> {user.company.name}</p>
                <p className="text-sm"><b>Phone:</b> {user.phone}</p>
              </div>
            </div>
          </div>
        }
    </>
  )
}

export default UserDetails