import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Signup({email}) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();


  const submit = async (data) => {
   var apidata = {name: data.name, email: email, password: data.password, phoneNo: data.number, otp: data.otp};
   axios.post("https://es-expo.herokuapp.com/users/otpVerify",apidata).then((data)=>{
    console.log(data);
   }).catch((err)=>{
    console.log(err);
   })
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      onChange={() => {
        console.log(errors);
      }}
    >
      <h1>Sign Up</h1>
      <span>OTP has been sent to {email}</span> 
      <input
        {...register("name", {
          required: true,
          maxLength: { value: 30, message: "Maximum 30 characters only" },
        })}
        type="text"
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name.message}</span>}
      <input
        {...register("number", { required: true })}
        type="text"
        placeholder="Phone number"
      />
      {errors.number && <span className="error">Please enter a valid phone number!</span>}

      <input
        {...register("password", { required: true, maxLength: 30 })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className="error">Password cannot be empty!</span>
      )}
      <input
        {...register("otp", { required: true })}
        type="text"
        placeholder="OTP"
      />
      {errors.otp && <span className="error">Please enter OTP.</span>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
