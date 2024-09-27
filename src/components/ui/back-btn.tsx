'use client'

import { useRouter } from "next/navigation"

function BackBtn() {
  const router = useRouter()

  return (
    <button 
      className="btn border"
      onClick={router.back}
    >
      Back
    </button>
  )
}

export default BackBtn