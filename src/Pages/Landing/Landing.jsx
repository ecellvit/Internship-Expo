import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Landing.css";
import axios from "axios";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../../Components/Loader/Loader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Landing() {
  const history = useHistory();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState("success");
  const [upload, setUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileChosen, setFile] = useState("No file Chosen");

  const snackbar = (type, text) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("resumeUploaded") === "true") {
      setUploaded(true);
    }
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
          setEmail(data.data.email);
          if (data.data.name.indexOf(" ") !== -1)
            setName(data.data.name.substring(0, data.data.name.indexOf(" ")));
          else setName(data.data.name);
          setStart(false);
          console.log(name);
          axios
            .post("https://expo21.herokuapp.com/user/search", {
              str: data.data.email,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status === "Success") {
                setUploaded(true);
                sessionStorage.setItem("resumeUploaded", "true");
              } else {
                sessionStorage.setItem("resumeUploaded", "false");
              }
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    if (localStorage.getItem("token") == null) history.push("/");
    else getData();

    //eslint-disable-next-line
  }, []);

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
        setLoading(false);
        snackbar("success", "Profile Updated Successfully!");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", "Some error occured! Try again later!");
      });
  };

  const resume = async (data) => {
    setLoading(true);
    const file = document.getElementById("file-upload").files[0];
    console.log(file);
    if (file.size > 5 * 1024 * 1024) {
      snackbar("error", "File Size limit 5mb!");
      setLoading(false);
      return;
    }
    var form = new FormData();
    form.append("image", file, "test.pdf");
    form.append("id", email);
    console.log(form);
    axios
      .post("https://expo21.herokuapp.com/user", form)
      .then((data) => {
        console.log(data);
        setLoading(false);
        snackbar("success", "Resume Uploaded!");
        setUpload(false);
        setUploaded(true);
        sessionStorage.setItem("resumeUploaded", "true");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        snackbar("error", "Some error occured! Try again later!");
      });
  };

  if (start) return <Loader />;

  return (
    <div className="below-nav">
      <div style={{ width: "100%" }}>
        <h1 className="profile-head">Welcome to Internship Expo, {name}!</h1>
        <h2 className="profile-head">Profile</h2>
        <h2 className="email">Email: {email} </h2>
        {upload ? (
          <div className="group">
            <br />
            <div className="form">
              {uploaded ? (
                <h3>Wish to modify your resume? Upload a new one below!</h3>
              ) : (
                <></>
              )}
              <h4>
                Upload Your Resume in PDF format by clicking on the button
                below. Make sure the file size doesn't exceed 5mb.
              </h4>
              <div className="wrap">
                <div className="flex-input">
                  <div className="btn">
                    <label for="file-upload" class="custom-file-upload">
                      Resume Upload
                    </label>
                  </div>
                  <div className="file-name">{fileChosen}</div>
                </div>
                <input
                  id="file-upload"
                  // accept="application/pdf"
                  {...register("file", { required: true })}
                  type="file"
                  onChange={(e) => {
                    console.log(e);
                    if (e.target.files[0]) setFile(e.target.files[0].name);
                  }}
                />
              </div>
              <button type="submit" onClick={resume} disabled={loading}>
                {loading ? (
                  <>
                    <CircularProgress color="#edb17b" size={12} /> Uploading
                  </>
                ) : (
                  "Upload"
                )}
              </button>
              <h2>
                Don't have a resume? You can easily generate one using <br />
                <a
                  style={{ fontSize: "1.3rem" }}
                  href="https://novoresume.com/resume-templates"
                  style={{ textDecoration: "underline" }}
                >
                  Novo Resume
                </a>
              </h2>
            </div>
            <div className="edit">
              <button
                onClick={() => {
                  setUpload(false);
                }}
              >
                Back
              </button>
            </div>
            <div style={{ marginTop: 15, fontSize: 18 }}>
              Facing Any Issues? Contact us on{" "}
              <a href="https://discord.gg/mtaDWMDPwH">Discord</a>
              <br />
              <br /> or contact
              <br />
              <div style={{ color: "#1a5678" }}>
                Shubham Satnalika (+91 81008 30040)
                <br />
                Yashraj Singh (+91 81144 22920)
                <br />
                Namrata Singhal (+91 82936 22180)
              </div>
            </div>
          </div>
        ) : (
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
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 characters only",
                  },
                })}
                type="text"
                placeholder="Name"
                disabled={!editable}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
              <div className="form-head">
                <h3>Phone Number</h3>
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
                <span className="error">
                  Please enter a valid phone number!
                </span>
              )}
              {editable ? (
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress color="#edb17b" size={12} />
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
              <button
                onClick={() => {
                  setUpload(true);
                }}
              >
                {uploaded ? "Update Resume" : "Upload Resume"}
              </button>
            </div>
            <div style={{ marginTop: 15, fontSize: 18 }}>
              Facing Any Issues? Contact us on{" "}
              <a href="https://discord.gg/mtaDWMDPwH">Discord</a>
              <br />
              <br /> or contact
              <br />
              <div style={{ color: "#1a5678" }}>
                Shubham Satnalika (+91 81008 30040)
                <br />
                Yashraj Singh (+91 81144 22920)
                <br />
                Namrata Singhal (+91 82936 22180)
              </div>
            </div>
          </div>
        )}
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
          severity={type}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Landing;
