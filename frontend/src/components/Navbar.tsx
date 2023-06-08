import { NavLink } from "react-router-dom";
import logo from "../assets/logoLight.png";
import github from "../assets/githubicon.png";
import { userContext } from "../context/userContext";
import { useContext } from "react";

function Navbara() {
  const { user } = useContext(userContext);
  return (
    <div className="flex justify-center mt-14">
      <div className="flex w-4/5 justify-between place-items-center text-white font-semibold text-medium">
        <NavLink to="/">
          <img src={logo} alt="logo" className="h-12" />
        </NavLink>
        <div className="flex place-items-center">
          <div className="max-tablet:hidden mr-4 px-4 py-1 border-2 rounded-full cursor-pointer">
            {user ? (
              <>
                <NavLink to="/">Sing Out</NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "hidden" : "flax")}
                >
                  Sing In
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "hidden" : "flax")}
                >
                  Sing Up
                </NavLink>
              </>
            )}
          </div>
          <div className="max-phone:hidden pl-3 pr-4 py-1  bg-btn-color rounded-full cursor-pointer">
            <NavLink to="/" className="flex place-items-center">
              <img src={github} alt="icon" className="w-8 mr-1" /> GitHub
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbara;
