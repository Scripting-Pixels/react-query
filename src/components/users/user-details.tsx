'use client'

import { useParams } from "next/navigation";

import Loading from "@/components/ui/loading";
import DisplayError from "../display-error";
import { useFetchUser } from "@/hooks/use-fetch-user";

function UserDetails() {
  const params = useParams()
  const userId = Array.isArray(params?.userId) ? params.userId[0] : params.userId

  const {
    data: user,
    isLoading,
    isError
  } = useFetchUser(userId)
  
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