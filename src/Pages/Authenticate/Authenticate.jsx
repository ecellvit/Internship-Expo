import "./Authenticate.css";
import { useState } from "react";

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
          <form>
            <h1>Sign Up</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Reg. No." />
            <input type="password" placeholder="Password" />
            <button onclick="return false;">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form>
            <h1>Log-In</h1>
            <span>and use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/">Forgot your password?</a>
            <button onclick="return false;">Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1>Welcome to Internship-Expo</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button class="sign-log-btn" id="signUp" onClick={signUp}>
                Sign Up
              </button>
            </div>
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
              <button class="sign-log-btn" id="signIn" onClick={signIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
