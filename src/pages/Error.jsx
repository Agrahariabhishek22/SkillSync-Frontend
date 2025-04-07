import React from "react"
import { useNavigate } from "react-router-dom"

const Error = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-universal text-white px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-richblack-200 max-w-md mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 rounded-md bg-yellow-50 px-5 py-2 text-black font-semibold hover:bg-yellow-100 transition-all duration-200"
      >
        Go to Home
      </button>
    </div>
  )
}

export default Error
