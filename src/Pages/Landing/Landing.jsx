import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Landing.css";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { useHistory } from "react-router";

function Landing() {
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      var token = localStorage.getItem("token");
      axios
        .get("https://es-expo.herokuapp.com/users/profile", {
          headers: { "auth-token": token },
        })
        .then((data) => {
          console.log(data);
          setValue("name", data.data.name);
          setValue("number", data.data.phoneNo);
          setValue("resume", data.data.resumeLink);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    if (localStorage.getItem("token")) getData();
    else {
      history.push("/");
    }
    if (localStorage.getItem("token") == null) history.push("/");
  }, []);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    var token = localStorage.getItem("token");
    var upd = {
      name: data.name,
      resumeLink: data.resume,
      phoneNo: data.number,
    };
    console.log(upd);
    axios
      .patch("https://es-expo.herokuapp.com/users/update", upd, {
        headers: { "auth-token": token },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="landing">
      <Navbar />
      <div className="below-nav">
        <form
          onSubmit={handleSubmit(submit)}
          onChange={() => {
            console.log(errors);
          }}
        >
          <input
            {...register("name", {
              required: true,
              maxLength: { value: 30, message: "Maximum 30 characters only" },
            })}
            type="text"
            placeholder="Name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <input {...register("resume")} type="url" placeholder="Resume Link" />
          <input
            {...register("number", { required: true, maxLength: 30 })}
            type="text"
            placeholder="Phone number"
          />
          {errors.number && (
            <span className="error">Please enter a valid phone number!</span>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
