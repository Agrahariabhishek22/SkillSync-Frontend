import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    < div className="flex items-center justify-center h-[100vh]">
    <form
      onSubmit={handleOnSubmit}
      className="mt-8 flex w-full  max-w-md flex-col gap-y-6"
    >
      <h2 className="text-3xl font-semibold text-richblack-5">Welcome Back!</h2>
      <p className="text-sm text-richblack-200">
        Please enter your credentials to sign in to your account.
      </p>

      {/* Email Input */}
      <label className="flex flex-col gap-1">
        <span className="text-sm text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          className="rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400 focus:outline-none"
          style={{ boxShadow: "inset 0 -1px 0 rgba(255, 255, 255, 0.18)" }}
        />
      </label>

      {/* Password Input */}
      <label className="relative flex flex-col gap-1">
        <span className="text-sm text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </span>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password"
          className="rounded-md bg-richblack-800 p-3 pr-12 text-richblack-5 placeholder:text-richblack-400 focus:outline-none"
          style={{ boxShadow: "inset 0 -1px 0 rgba(255, 255, 255, 0.18)" }}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-10 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={22} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 text-right text-xs text-blue-100">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="rounded-md bg-gradient-to-r from-[#06D6A0] to-[#118AB2] py-2 text-center text-[16px] font-semibold text-white transition duration-200 hover:scale-[1.02]"
      >
        Sign In
      </button>

      {/* Sign Up Redirect */}
      <p className="text-sm text-richblack-200">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-100 underline">
          Sign up
        </Link>
      </p>
    </form>
    </div>
  )
}

export default LoginForm
