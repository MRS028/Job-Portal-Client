import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import axios from "axios";

const SocialLogin = () => {
  const { signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = user?.email;
  // console.log(user?.metadata?.lastSignInTime);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const email = result.user.email;
        const user = { email: email };
        axios.post("http://localhost:3000/jwt", user,{withCredentials:true}).then((res) => {
          console.log(res.data);
        });
        console.log();
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Welcome Back",
          text: "Welcome to Chill Gamer!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });

        // console.log(result.user);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
  return (
    <div>
      <div className="divider m-4">OR</div>
      <div className="m-4 flex justify-center">
        <button onClick={handleGoogleSignIn} className="btn">
          <FcGoogle className="mr-2" /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
