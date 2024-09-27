import Link from "next/link"

import { User } from "@/types"

function UserItem({ user }: { user: User }) {
  return (
    <li className="card bg-base-100">
      <div className="card-body flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-16 rounded-full">
              <span className="text-3xl">
                {Array.from(user.name)[0]}
              </span>
            </div>
          </div>
          <div>
            <h2 className="card-title">{user.name}</h2>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link 
            className="btn" 
            href={`/p/${user.id}`}
          >
            Posts
          </Link>
          <Link 
            className="btn" 
            href={`/u/${user.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </li>
  )
}

export default UserItem