import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../context/userContext";

const activeStyle =
  "bg-red-500 text-white font-bold p-1 rounded-md w-28 outline-none";

const notActiveStyle =
  "bg-primary mr-4 text-white font-bold p-2 rounded-full w-20 outline-none";

function Navbar() {
  const { user } = useContext(userContext);

  const testLog = () => {
    console.log(user);
  };

  return (
    <div>
      <div className="flex my-3 mt-10 space-x-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeStyle : notActiveStyle
          }
          onClick={testLog}
        >
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              Register
            </NavLink>
          </>
        )}
        <NavLink
          to="/resetpassword"
          className={({ isActive }) =>
            isActive ? activeStyle : notActiveStyle
          }
          onClick={testLog}
        >
          Reset password
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
