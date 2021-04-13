import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Landing.css";
import axios from "axios";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../Components/Loader/Loader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function Landing() {
  const history = useHistory();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(true);
  const [email, setEmail] = useState("");
  const [random, setRandom] = useState(true);
  const [open, setOpen] = useState(false);

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
          setEmail(data.data.email);
          setStart(false);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    if (localStorage.getItem("token") == null) history.push("/");
    else getData();
  }, [random]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setLoading(true);
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
        setOpen(true);
        setRandom((val) => {
          return !val;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (start) return <Loader />;

  return (
    <div className="below-nav">
      <h1 className="profile-head">Profile</h1>
      <h2 className="email">Email: {email} </h2>
      <div className="group">
        <form
          className="form"
          onSubmit={handleSubmit(submit)}
          onChange={() => {
            console.log(errors);
          }}
        >
          <div className="form-head">
            <h3>Name</h3>
          </div>
          <input
            {...register("name", {
              required: true,
              maxLength: { value: 30, message: "Maximum 30 characters only" },
            })}
            type="text"
            placeholder="Name"
            disabled={!editable}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <div className="form-head">
            <h3>Resume</h3>
          </div>
          <input
            {...register("resume")}
            type="url"
            placeholder="Resume Link"
            disabled={!editable}
          />
          <div className="form-head">
            <h3>Number</h3>
          </div>
          <input
            {...register("number", {
              required: true,
              maxLength: 10,
              pattern: /^[0-9]{10}$/,
            })}
            type="text"
            placeholder="Phone number"
            disabled={!editable}
          />
          {errors.number && (
            <span className="error">Please enter a valid phone number!</span>
          )}
          {editable ? (
            <button type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="white" size={12} />
              ) : (
                "Submit"
              )}
            </button>
          ) : (
            <div className="btn-disable"></div>
          )}
        </form>
        <div className="edit">
          <button
            onClick={() => {
              setEditable((val) => {
                return !val;
              });
            }}
          >
            {editable ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
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
          severity="success"
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Landing;
