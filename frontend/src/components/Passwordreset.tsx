import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { IFormInput } from "../utils/config";

import {
  passwordMaxLengthMsg,
  passwordMinLengthMsg,
  passwordMsg,
  passwordPattern,
  requiredMsg,
} from "../utils/vidation";

import axios from "axios";
import { useParams } from "react-router-dom";

function Passwordreset() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [rePasswordEye, setRePasswordEye] = useState(false);
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    axios
      .post(`/passwordreset/${params.resetToken}`, { data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
    <div>
      <div className="flex justify-center mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-2">
          <div className="flex flex-col relative space-y-1">
            <input
              type={passwordEye === false ? "password" : "text"}
              className="mb-2 bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
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

          <div className="flex flex-col relative space-y-1">
            <input
              type={rePasswordEye === false ? "password" : "text"}
              className="mb-2 bg-bg-input rounded-md h-11 p-4 font-normal text-black placeholder-slate-00"
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

          <div className="flex flex-col space-y-1">
            <button
              type="submit"
              className="w-full h-12 p-2 bg-btn-color rounded-md font-bold text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Passwordreset;
