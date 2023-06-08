import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <button
          className="flex mt-6 px-10 justify-center items-center bg-white text-black rounded-lg h-10 cursor-pointer font-bold"
          onClick={logout}
        >
          Sing out
        </button>
      </div>
    </>
  );
}

export default Dashboard;
