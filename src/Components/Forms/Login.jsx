import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router";
import Forgot from "./Forgot";

export default function Login({ snackbar }) {
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submit = async (data) => {
    setLoading(true);
    let captcha = await executeRecaptcha("/");
    var apd = { email: data.email, password: data.password, captcha: captcha };
    axios
      .post("https://es-expo.herokuapp.com/users/login", apd)
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);
        setLoading(false);
        snackbar("success", "Login Successfully!");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", err.response.data.errorText);
      });

    console.log(data);
  };

  if (forgot) return <Forgot snackbar={snackbar} setForgot={setForgot} />;

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <h1>Log In</h1>
        {/* <span>Enter VIT email:</span> */}
        <input
          placeholder="VIT email"
          {...register("email", {
            required: true,
            pattern: /^[a-z.]+20(18|19|20)[a-z]?@vitstudent.ac.in$/,
          })}
        />
        {errors.email && (
          <span className="error">Please enter valid VIT email!</span>
        )}
        <input
          {...register("password", { required: true, maxLength: 30 })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="error">Password cannot be empty!</span>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress color="#edb17b" size={12} /> : "Submit"}
        </button>
        <button className="forgot-link" onClick={() => setForgot(true)}>
          Forgot Password
        </button>
      </form>
    </>
  );
}
