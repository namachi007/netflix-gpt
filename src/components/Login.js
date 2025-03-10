import Header from "./Header";
import { useState , useRef, use } from "react";
import { validityForm } from "../utils/validityForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL_Netflix } from "../utils/constants";


const Login = () => {
const [isSignIn, setIsSignIn] = useState(true);
const emailRef = useRef(null);
const passwordRef = useRef(null);
const [error, setError] = useState(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
const handleButtonClick = () => {
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  const validityChecker = validityForm(email, password);
  setError(validityChecker);

  if(validityChecker !== null) return;

  if(isSignIn === false) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
         console.error("Error:", error.message);
        setError(errorMessage);
      });
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", error.message);
        setError(errorMessage);
      });
  }
}

return (
  <div className="bg-black">
    <Header />
    <div className=" relative w-full  overflow-hidden h-screen">
      <img
        className=" h-full w-full "
        srcset={BG_URL_Netflix}
        alt=""
        aria-hidden="true"
        class="default-ltr-cache-19j6xtr"
      ></img>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/90"></div>
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
      <div className="bg-black/60 p-10 rounded-md  w-full flex flex-col justify-center items-center ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center w-full"
        >
          <h1 className="text-white font-bold text-3xl my-4">
            {isSignIn ? "Sign In" : "Sign up"}
          </h1>
          {!isSignIn && (
            <input
              placeholder="Full Name"
              type="name"
              className="border border-slate-700 p-3 mt-4 mb-2 rounded-md w-72"
            ></input>
          )}
          <input
            ref={emailRef}
            placeholder="Email"
            type="email"
            className="border border-slate-700 p-3 my-2 rounded-md w-72"
          ></input>
          <input
            ref={passwordRef}
            placeholder="Password"
            type="password"
            className="border border-slate-700 p-3 my-2 rounded-md w-72"
          ></input>
        </form>
        <p>
          {error && (
            <span className="text-red-500 text-md font-medium ">{error}</span>
          )}
        </p>
        <button
          className="border border-red-600  h-9 text-white font-semibold bg-red-600 rounded-md mt-5 w-72"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign up"}
        </button>
        <p className="font-medium text-gray-400 my-10 ">
          {isSignIn ? "New to Netflix?" : "Already have an account?"}{" "}
          <span
            className=" text-white cursor-pointer "
            onClick={toggleSignInForm}
          >
            {isSignIn ? "Sign up now." : "Sign In."}{" "}
          </span>{" "}
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;