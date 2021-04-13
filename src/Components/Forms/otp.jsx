import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Signup from "./Signup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Otp() {
  const [sent, setSent] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const submit = async (data) => {
    setLoading(true);
    axios
      .post("https://es-expo.herokuapp.com/users/register", data)
      .then((data) => {
        console.log(data);
        setSent(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOpen(true);
      });

    console.log(data);
  };
  if (sent) {
    return <Signup email={getValues().email} />;
  }
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
          severity="error"
        >
          This is email is already registered!
        </Alert>
      </Snackbar>
    </>
  );
}
