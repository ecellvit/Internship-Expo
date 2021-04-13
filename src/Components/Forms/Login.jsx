import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      history.push("/dashboard");
    }
  }, []);

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
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      onChange={() => {
        console.log(errors);
      }}
    >
      <h1>Log In</h1>
      <span>Enter VIT email:</span>

      <input
        placeholder="VIT email"
        {...register("email", {
          required: true,
          pattern: /^[a-zA-Z0-9+_.-]+@vitstudent.ac.in$/,
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
        {loading ? <CircularProgress color="white" size={12} /> : "Submit"}
      </button>
    </form>
  );
}
