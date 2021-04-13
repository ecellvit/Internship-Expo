import "./Authenticate.css";
import { useState } from "react";
import Login from "../../Components/Forms/Login";
import Otp from "../../Components/Forms/otp";

function Authenticate() {
  const [flag, setFlag] = useState(false);

  const signUp = () => {
    setFlag(!flag);
  };

  const signIn = () => {
    setFlag(!flag);
  };

  return (
    <div className="outer">
      <div
        class={`container ${flag === true ? "right-panel-active" : ""}`}
        id="container"
      >
        <div class="form-container sign-up-container">
          <Otp />
        </div>
        <div class="form-container sign-in-container">
          <Login />
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info. </p>
              <p>Don't have an account? Sign In!</p>
              <button class="sign-log-btn" id="signUp" onClick={signUp}>
                Sign Up
              </button>
            </div>
            <div class="overlay-panel overlay-left">
              <h1>Welcome to Internship-Expo</h1>
              <p>Enter your personal details and start your journey with us.</p>
              <p>Already have an account? Log In!</p>
              <button class="sign-log-btn" id="signIn" onClick={signIn}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
