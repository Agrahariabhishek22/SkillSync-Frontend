import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ContactUs from "./pages/ContactUs";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupForm from "./components/core/Auth/SignupForm";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 flex flex-col font-inter ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <SignupForm />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <LoginForm />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>
          {/* ViewCourse ,VideoDetails */}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
