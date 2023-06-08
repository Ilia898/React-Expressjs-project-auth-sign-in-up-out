import { useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
declare var google: any;

function Bottom() {
  const { setUser, setAuthStatus } = useContext(userContext);
  const navigate = useNavigate();

  const handleCredentialResponse = async (response: any) => {
    const userCredential = jwt_decode(response.credential);
    await axios
      .post("/authwith", { userCredential })
      .then((res) => {
        setUser(res.data);
        setAuthStatus(true);
        navigate("/dasboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_TOKEN,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", width: "288px" } // customization attributes
    );
  }, []);

  return (
    <div className="w-72 py-14 text-center mx-auto">
      <div id="buttonDiv"></div>
      <p className="mt-6 text-xs text-gray-300">
        By clicking Sign Up above, you acknowledge that you have read and agree
        to <span className="text-white underline">Our Terms</span> and{" "}
        <span className="text-white underline">Privacy Policy</span> (This is an
        example)
      </p>
    </div>
  );
}

export default Bottom;
