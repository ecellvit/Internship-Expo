import "./Authenticate.css";
import { useEffect, useState } from "react";
import Login from "../../Components/Forms/Login";
import Otp from "../../Components/Forms/otp";
import LOGO from "../../Assets/logo.png";
import { useHistory } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Authenticate({ snackbar }) {
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("success");

  const history = useHistory();

  const snack = (type, text) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div className="outer">
      <div
        class={`container ${flag === true ? "right-panel-active" : ""}`}
        id="container"
      >
        <div class="form-container sign-up-container">
          <Otp snackbar={snack} />
        </div>
        <div class="form-container sign-in-container">
          <Login snackbar={snack} />
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <div class="logo">
                <img src={LOGO} alt="Logo Image" />
              </div>
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info. </p>
              <p>Don't have an account? Sign In!</p>
              <button
                class="sign-log-btn"
                id="signUp"
                onClick={() => {
                  setFlag((val) => !val);
                }}
              >
                Sign Up
              </button>
            </div>
            <div class="overlay-panel overlay-left">
              <div class="logo">
                <img src={LOGO} alt="Logo Image" />
              </div>
              <h1>Welcome to Internship-Expo</h1>
              <p>Enter your personal details and start your journey with us.</p>
              <p>Already have an account? Log In!</p>
              <button
                class="sign-log-btn"
                id="signIn"
                onClick={() => {
                  setFlag((val) => !val);
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={type}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Authenticate;
