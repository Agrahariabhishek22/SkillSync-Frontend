import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import logo from "../../assets/Logo/logo2.jpg";
import NavbarLinks from "../../data/navbar-links";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="h-14 border-b-[1px] border-b-richblack-700 py-[8px] bg-richblack-900">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto">
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="ml-7 rounded-full h-[46px] w-[65px]" loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, idx) => (
              <li key={idx}>
                {link.title === "Catalog" ? (
                  <div className="relative group cursor-pointer flex items-center gap-1">
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-1/2 top-[50%] z-50 flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-300"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Controls */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping className="text-white text-xl" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-yellow-50 text-black text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button className="md:hidden text-white text-2xl ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-richblack-900 bg-opacity-90 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50 flex flex-col items-center pt-20 space-y-6 text-white`}
      >
        <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
          <AiOutlineClose />
        </button>

        {NavbarLinks.map((link, idx) => (
          <Link key={idx} to={link?.path} onClick={() => setIsMenuOpen(false)} className="text-xl">
            {link.title}
          </Link>
        ))}

        {user && user?.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative text-xl" onClick={() => setIsMenuOpen(false)}>
            <FaCartShopping className="text-white text-2xl" />
            {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-yellow-50 text-black text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>}
          </Link>
        )}

        {token === null ? (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="border border-richblack-700 bg-richblack-800 px-6 py-3 rounded">
              Login
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="border border-richblack-700 bg-richblack-800 px-6 py-3 rounded">
              Signup
            </Link>
          </>
        ) : (
          <ProfileDropDown />
        )}
      </div>
    </div>
  );
};

export default Navbar;
