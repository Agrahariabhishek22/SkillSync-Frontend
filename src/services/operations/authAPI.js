import { setLoading, setToken } from "../../slices/AuthSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // Make the API call to the login endpoint
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // Debugging API response
      console.log("LOGIN API RESPONSE ......", response);

      // If login is unsuccessful, throw an error
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // On successful login, show success message and store token/user
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      // Set the user image, defaulting to a generated one if not available
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      // Dispatch the user data with the image
      dispatch(setUser({ ...response.data.user, image: userImage }));

      // Save token and user data in local storage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the profile page
      navigate("/dashboard/my-profile");
    } catch (error) {
      // Log the error to debug further
      console.log("LOGIN API ERROR............", error);

      // Handle different error types and show a relevant message
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Login Failed. Please try again later.");
      }
    } finally {
      // Always dismiss the loading state
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async(dispatch)=>{
    dispatch(setLoading(true));
    const toastId=toast.loading("Loading...")
    try {
      const response=await apiConnector("POST",SIGNUP_API,{
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })
      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successfully");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/login")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export const getPasswordResetToken = function (email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // console.log("enter1")
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      // console.log("enter2")

      console.log("Reset Password Token Response....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset email sent");
      setEmailSent(true);
    } catch (error) {
      console.log("Reset Password Token Error");
      toast.error("Cannot send email");
    }
    dispatch(setLoading(false));
  };
};

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // console.log("hello g");
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE.....", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(`${response.data.message}`);
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      // console.log("e")
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("e")
      
      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}


export function logout(navigate){
  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logged out");
    navigate("/")
  }
}
