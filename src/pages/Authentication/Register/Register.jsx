import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
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
      <h1 className="text-5xl font-bold">Register now!</h1>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}
              {
                // regex for password
                errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    <ul>
                      <li>At least one lowercase letter</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number</li>
                    </ul>
                  </p>
                )
              }

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
