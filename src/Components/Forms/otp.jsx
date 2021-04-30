import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Signup from "./Signup";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Otp({ snackbar }) {
  const [sent, setSent] = useState(false);
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
      .post("https://es-expo.herokuapp.com/users/register", data)
      .then((data) => {
        //console.log(data);
        setSent(true);
        snackbar("success", "OTP sent successfully!");
        setLoading(false);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
        snackbar("error", err.response.data.errorMessage);
      });

    //console.log(data);
  };

  if (sent) {
    return <Signup snackbar={snackbar} email={getValues().email} />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        onChange={() => {
          //console.log(errors);
        }}
      >
        <h1>Sign Up</h1>
        {/* <span>Enter VIT email:</span> */}

        <input
          placeholder="VIT email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9.]+@(vitstudent.ac.in|vitbhobal.ac.in|vitchennai.ac.in|vitap.ac.in)$/,
            setValueAs: (val) => val.trim(),
          })}
        />
        {errors.email && (
          <span className="error">Please enter valid VIT email!</span>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress color="#edb17b" size={12} /> : "Submit"}
        </button>
      </form>
    </>
  );
}
