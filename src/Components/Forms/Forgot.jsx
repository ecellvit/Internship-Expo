import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Otp({ snackbar }) {
  // const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setLoading(true);
    axios
      .post("https://es-expo.herokuapp.com/users/forgotPassword", data)
      .then((data) => {
        console.log(data);
        // setSent(true);
        snackbar("success", "OTP sent successfully!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", err.response.data.errorMessage);
      });
    console.log(data);
  };

  // if (sent) {
  //   return <Signup snackbar={snackbar} email={getValues().email} />;
  // }

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        onChange={() => {
          console.log(errors);
        }}
      >
        <h1>Sign Up</h1>
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
        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress color="white" size={12} /> : "Submit"}
        </button>
      </form>
    </>
  );
}