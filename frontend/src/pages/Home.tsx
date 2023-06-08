import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const dashboardBtn = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col space-y-1">
      <button
        className="flex mt-6 px-10 justify-center items-center bg-white text-black rounded-lg h-10 cursor-pointer font-bold"
        onClick={dashboardBtn}
      >
        Dashboard
      </button>
    </div>
  );
}

export default Home;
