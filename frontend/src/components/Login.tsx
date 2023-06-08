import { useState, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { userContext } from "../context/userContext";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import { LoginInput } from "../utils/config";

import {
  emailErrorMsg,
  emailMaxLengthMsg,
  emailPattern,
  passwordMaxLengthMsg,
  passwordMinLengthMsg,
  passwordMsg,
  passwordPattern,
  requiredMsg,
} from "../utils/vidation";

function Login() {
  const [passwordEye, setPasswordEye] = useState(false);
  const { user, setUser, setAuthStatus } = useContext(userContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    axios
      .post("/login", { data })
      .then((res) => {
        setUser(res.data);
        setAuthStatus(true);
      })
      .catch((err) => {
        setError("password", { type: "429", message: err.response.data.error });
      });
  };

  const passwordVisibleClick = () => {
    setPasswordEye(!passwordEye);
  };

  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-2">
        <div className="flex flex-col space-y-1">
          <input
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            autoComplete="email"
            placeholder="email ..."
            {...register("email", {
              required: requiredMsg,
              pattern: {
                value: emailPattern,
                message: emailErrorMsg,
              },
              maxLength: {
                value: 254,
                message: emailMaxLengthMsg,
              },
            })}
          />

          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col relative space-y-1">
          <input
            type={passwordEye === false ? "password" : "text"}
            className="mb-2 bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            autoComplete="current-password"
            placeholder="password ..."
            {...register("password", {
              required: requiredMsg,
              pattern: {
                value: passwordPattern,
                message: passwordMsg,
              },
              minLength: {
                value: 7,
                message: passwordMinLengthMsg,
              },
              maxLength: {
                value: 20,
                message: passwordMaxLengthMsg,
              },
            })}
          />

          <div className="flex right-3 top-2.5 text-black text-xl absolute cursor-pointer">
            {passwordEye === true ? (
              <AiFillEyeInvisible onClick={passwordVisibleClick} />
            ) : (
              <AiFillEye onClick={passwordVisibleClick} />
            )}
          </div>

          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 p-2 bg-btn-color rounded-md font-bold text-white"
        >
          Sign in
        </button>
        <div className="flex justify-between text-white font-medium text-sm underline underline-offset-4">
          <NavLink to="/ForgotPassword">Forgot your password?</NavLink>
          <NavLink to="/register">Sing Up</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
