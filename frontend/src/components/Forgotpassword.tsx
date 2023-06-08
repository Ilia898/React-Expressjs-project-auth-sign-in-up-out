import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput } from "../utils/config";
import axios from "axios";
import {
  emailErrorMsg,
  emailMaxLengthMsg,
  emailPattern,
  requiredMsg,
} from "../utils/vidation";

const onSubmit: SubmitHandler<LoginInput> = async (data) => {
  axios
    .post("/forgotpassword", { data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

function Resetpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    mode: "onBlur",
  });
  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-2">
        <div className="flex flex-col space-y-1  text-white">
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
        <div className="flex flex-col space-y-1">
          <button className="w-full h-12 p-2 bg-btn-color rounded-md font-bold text-white">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Resetpassword;
