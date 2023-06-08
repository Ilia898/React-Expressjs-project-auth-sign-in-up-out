import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import dashLogo from "../assets/dashLogoLight.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout, authStatus, setAuthStatus } = useContext(userContext);
  console.log(user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [authStatus]);

  return (
    <div className="mt-12 text-center text-white font-bold">
      {user && (
        <p className="bg-green text-white font-medium text-2xl capitalize">
          Welcome, {user.firstName}!
        </p>
      )}

      <div className="w-72 mt-5 space-y-8 mx-auto">
        <img src={dashLogo} alt="logo" className="w-60 mx-auto" />
        <button
          onClick={logout}
          className="w-full h-12 p-2 bg-btn-color rounded-md font-bold text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
