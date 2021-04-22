import "./Authenticate.css";
import { useEffect, useState } from "react";
import Login from "../../Components/Forms/Login";
import Otp from "../../Components/Forms/otp";
import LOGO from "../../Assets/logo.png";
import { useHistory } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

function Authenticate() {
  const [flag, setFlag] = useState(true);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("success");
  const [modal, setModal] = useState(true);

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
              <p>Don't have an account?</p>
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
              <p>Already have an account?</p>
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
      <Dialog
        onClose={() => setModal(false)}
        aria-labelledby="simple-dialog-title"
        open={modal}
        fullScreen={useMediaQuery(useTheme().breakpoints.down("xs"))}
        PaperProps={{
          className: "modal",
        }}
        disableBackdropClick
      >
        <DialogContent>
          <div class="logo">
            <img src={LOGO} alt="Logo Image" />
          </div>
          <br />
          <br />
          <h1>Welcome to Internship-Expo</h1>
          <h3>
            Start-up Internship Expo provides you with the chance of landing
            your dream internships and enriching yourself with industrial
            knowledge. Major startups from all over India will become a part of
            this motion on the 2nd of May by providing internship offers in
            multiple domains of Management, Tech and Design.
          </h3>
          <button
            class="sign-log-btn"
            onClick={() => {
              setModal(false);
            }}
            style={{ float: "right" }}
          >
            Continue
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Authenticate;
