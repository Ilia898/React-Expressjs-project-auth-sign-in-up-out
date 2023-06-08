import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { IFormInput } from "../utils/config";

import {
  emailErrorMsg,
  emailMaxLengthMsg,
  emailPattern,
  nameErrorMsg,
  nameMaxLengthMsg,
  namePattern,
  passwordMaxLengthMsg,
  passwordMinLengthMsg,
  passwordMsg,
  passwordPattern,
  requiredMsg,
} from "../utils/vidation";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

function Register() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [rePasswordEye, setRePasswordEye] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      navigate("/dasboard");
    }
  }, [user]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    axios
      .post("/register", { data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError("email", { type: "400", message: err.response.data });
      });
  };

  const passwordVisibleClick = () => {
    setPasswordEye(!passwordEye);
  };

  const rePasswordVisibleClick = () => {
    setRePasswordEye(!rePasswordEye);
  };

  const replaypassword = watch("password");

  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-2">
        <div className="flex flex-col space-y-1">
          <input
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            placeholder="First Name* ..."
            {...register("firstName", {
              required: requiredMsg,
              pattern: {
                value: namePattern,
                message: nameErrorMsg,
              },
              maxLength: {
                value: 30,
                message: nameMaxLengthMsg,
              },
            })}
          />

          {errors.firstName && (
            <span className="text-sm text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <input
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            placeholder="Last Name* ..."
            {...register("lastName", {
              required: requiredMsg,
              pattern: {
                value: namePattern,
                message: nameErrorMsg,
              },
              maxLength: {
                value: 30,
                message: nameMaxLengthMsg,
              },
            })}
          />

          {errors.lastName && (
            <span className="text-sm text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <input
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            placeholder="email* ..."
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
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            type={passwordEye === false ? "password" : "text"}
            placeholder="password* ..."
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

        <div className="flex flex-col relative space-y-1">
          <input
            className="bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
            type={rePasswordEye === false ? "password" : "text"}
            placeholder="Re-enter password* ..."
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            {...register("reEnterPassword", {
              required: requiredMsg,
              validate: (value) =>
                value === replaypassword || "Passwords must match",
            })}
          />

          <div className="flex right-3 top-2.5 text-black text-xl absolute cursor-pointer">
            {rePasswordEye === true ? (
              <AiFillEyeInvisible onClick={rePasswordVisibleClick} />
            ) : (
              <AiFillEye onClick={rePasswordVisibleClick} />
            )}
          </div>

          {errors.reEnterPassword && (
            <span className="text-sm text-red-500">
              {errors.reEnterPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 p-2 bg-btn-color rounded-md font-bold text-white"
        >
          Sign up
        </button>
        <div className="flex justify-between text-white font-medium text-sm underline underline-offset-4">
          <NavLink to="/ForgotPassword">Forgot your password?</NavLink>
          <NavLink to="/">Sing In</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
