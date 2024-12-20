import React, { useContext, useState } from "react";
import signinLotiie from "../../assets/Lottie/signin.json";
import Lottie from "lottie-react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { option } from "motion/react-client";

const SignIn = () => {
  const { signinUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signinUser(email, password, rememberMe)
      .then((result) => {
        const user = { email: email };
        axios.post("https://job-portal-server-taupe.vercel.app/jwt", user,{withCredentials:true}).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully signed in.",
          icon: "success",
          timer: 1000, // Closes automatically after 1 second
          timerProgressBar: true,
        });

        navigate(location?.state ? location.state : "/");
        // console.log("signin user", result.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:w-96">
          <Lottie animationData={signinLotiie}></Lottie>
        </div>
        <div className="card bg-base-100 w-11/12 mx-auto shadow-2xl">
          <div className="text-center">
            <h1 className="text-5xl mt-4 font-bold font-gilroy">Sign In</h1>
          </div>
          <form className="card-body" onSubmit={handleSignIn}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <div className="flex justify-between">
                <div className="form-control pt-3">
                  <label className="label flex justify-start gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="checkbox checkbox-sm w-5 h-5"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className=" text-xs lg:label-text">Remember Me</span>
                  </label>
                </div>
                <label className="label">
                  <Link to="/signin" className="text-xs lg:text-sm pt-2 text-blue-500 link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
            </div>

            <div className="form-control mt-1">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
          <p className="text-sm text-center text-gray-500 mt-2 mb-4">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
