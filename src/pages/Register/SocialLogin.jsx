import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        console.log(result.user);
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
