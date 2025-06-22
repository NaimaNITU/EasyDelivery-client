import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="card bg-base-100 w-96  max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center font-bold">Login now!</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset    ">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email")}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-error">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-error">
                  Password must be 6 characters or more
                </p>
              )}
              {}

              <button className="btn btn-primary text-black mt-4">Login</button>
              <p>
                Don't have an account?
                <Link
                  className="text-primary font-semibold"
                  to="/auth/register"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
