import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoadiing] = useState(true);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //signIn User
  const signinUser = (email, password) => {
    setLoadiing(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //signOut
  const signOutUser = () => {
    setLoadiing(true);
    return signOut(auth);
  };
  //google login
  const signInWithGoogle = () => {
    setLoadiing(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };
        axios.post("https://job-portal-server-taupe.vercel.app/jwt", user).then((res) => {
          // console.log(res.data);
          setLoadiing(false);
        });
      } else {
        axios
          .post("https://job-portal-server-taupe.vercel.app/logout", {}, { withCredentials: true })
          .then((res) => {
            // console.log("LogOut", res.data);
            setLoadiing(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signinUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
