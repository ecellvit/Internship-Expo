import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Forgot({ snackbar, setForgot }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const sendOtp = async (data) => {
    setLoading(true);
    axios
      .post("https://es-expo.herokuapp.com/users/forgotPassword", data)
      .then((data) => {
        console.log(data);
        setSent(true);
        snackbar("success", "OTP sent successfully!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", err.response.data.errorMessage);
      });
    // console.log(data);
  };

  const confirmOtp = async (data) => {
    setLoading(true);
    axios
      .patch("https://es-expo.herokuapp.com/users/updatePassword", data)
      .then((data) => {
        console.log(data);
        setSent(true);
        snackbar("success", "Password Changed Successfully!");
        setForgot(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", err.response.data.errorMessage);
      });
    // console.log(data);
  };

  if (sent) {
    return (
      <form onSubmit={handleSubmit(confirmOtp)}>
        <h1>Forgot Password</h1>
        <span>Reset it now!</span>

        <input
          placeholder="VIT email"
          {...register("email", {
            required: true,
            pattern: /^[a-z.]+20(18|19|20)@vitstudent.ac.in$/,
          })}
        />
        {errors.email && (
          <span className="error">Please enter valid VIT email!</span>
        )}
        <input
          {...register("otp", { required: true })}
          type="text"
          placeholder="OTP"
        />
        {errors.otp && <span className="error">Please enter OTP.</span>}
        <input
          {...register("password", { required: true, maxLength: 30 })}
          type="password"
          placeholder="New Password"
        />
        {errors.password && (
          <span className="error">Password cannot be empty!</span>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress color="#edb17b" size={12} /> : "Submit"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(sendOtp)}>
      <h1>Forgot Password</h1>
      <span>Reset it now!</span>

      <input
        placeholder="VIT email"
        {...register("email", {
          required: true,
          pattern: /^[a-z.]+20(18|19|20)@vitstudent.ac.in$/,
        })}
      />
      {errors.email && (
        <span className="error">Please enter valid VIT email!</span>
      )}
      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress color="#edb17b" size={12} /> : "Send OTP"}
      </button>
      <button className="forgot-link" onClick={() => setForgot(false)}>
        Back to Login
      </button>
    </form>
  );
}
