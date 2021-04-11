import React,{useState} from "react";
import { useForm } from "react-hook-form"; 
import axios from "axios";
import Signup from "./Signup";

export default function Otp() {

 const [sent,setSent] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
   axios.post("https://es-expo.herokuapp.com/users/register", data).then((data)=>{
       console.log(data);
       setSent(true);
   }).catch((err)=>{
    console.log(err);
   });

   console.log(data);
  };
  if(sent){
   return <Signup email={getValues().email}/>;
  }
  return (
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
      <button type="submit">Generate OTP</button>
    </form>
  );
}
