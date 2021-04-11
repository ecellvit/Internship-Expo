import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Landing.css";
import Row from "../../Components/Table/Table";
import axios from "axios";

function Landing() {
  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://es-expo.herokuapp.com/users/profile")
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    getData();
  });
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {};
  return (
    <div className="landing">
      <form
        onSubmit={handleSubmit(submit)}
        onChange={() => {
          console.log(errors);
        }}
      ></form>
      {/* <Row /> */}
    </div>
  );
}

export default Landing;
