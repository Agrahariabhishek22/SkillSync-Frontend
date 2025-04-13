import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/logo2.jpg";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script"); // Step 1: Create a <script> element
    script.src = src; // Step 2: Set the source URL of the script

    script.onload = () => {
      resolve(true); // Step 3a: If script loads successfully, resolve the promise with `true`
    };
    script.onerror = () => {
      resolve(false); // Step 3b: If loading fails, resolve the promise with `false`
    };

    document.body.appendChild(script); // Step 4: Append the script to the document to load it
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    //initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log("PRINTING orderResponse", orderResponse);
    //options

    //  1. Configure Razorpay options
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // your Razorpay key (from .env)
        currency: orderResponse.data.data.currency, // e.g., "INR"
        amount: `${orderResponse.data.data.amount}`, // in paisa (e.g., 50000 = ₹500)
        order_id: orderResponse.data.data.id, // Razorpay order_id
        name: "SkillSync", // Company name on Razorpay UI
        description: "Thank You for Purchasing the Course",
        image: rzpLogo, // Logo shown in Razorpay popup
        prefill: {
          name: userDetails.firstName,
          email: userDetails.email,
        },
        handler: function (response) {
          // This runs when payment is successful!
          sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
          verifyPayment({ ...response, courses }, token, navigate, dispatch);
        },
      };
    //    2. Launch Razorpay checkout
    const paymentObject = new window.Razorpay(options);
paymentObject.open(); // opens Razorpay payment popup
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful, you are addded to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
