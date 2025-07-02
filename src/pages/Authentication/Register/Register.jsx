import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "./../SocialLogin/SocialLogin";
import { useLocation } from "react-router";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        alert("user created successfully");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //handle image
  const handleImageUpload = async (event) => {
    const img = event.target.files[0];

    const formData = new FormData();
    formData.append("image", img);
    const imageurl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imagebb_api_key
    }`;
    const res = await axios.post(imageurl, formData);
    console.log(res);
  };
  return (
    <div>
      <div className="card bg-base-100 w-96 max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center font-bold">Register now!</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}

              {/* image */}
              <label className="label">Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="input"
                placeholder="Image"
              />

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

              <button className="btn btn-primary text-black mt-4">
                Register
              </button>
              <p>
                Already have an account?{" "}
                <Link className="text-primary font-bold" to="/auth/login">
                  Login
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

export default Register;
