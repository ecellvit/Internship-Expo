import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router";

export default function ProfileUpdate() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const getData = async (data)=>{
  }
  const update = async (data) => {};
  return ;
}
