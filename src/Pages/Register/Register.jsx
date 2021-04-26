import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { Grid, makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    borderRadius: 10,
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.type === "light" ? "#ddd" : "white",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {
      color:
        theme.palette.type === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.65)",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
  },
}));

export default function Register() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  // Change to start true when we connect APIs
  const [start, setStart] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem("resumeUploaded") !== "true") {
      setModal(true);
    }

    const token = localStorage.getItem("token");
    axios
      .get("https://es-expo.herokuapp.com/company/getAll", {
        headers: { "auth-token": token },
      })
      .then((data) => {
        console.log(data);
        var arr = [];
        data.data.forEach((t, index) => {
          arr.push({ ...t, id: index });
        });
        setData(arr);
        setStart(false);
      })
      .catch((err) => {
        console.log(err);
        alert("No slots available");
      });
  }, []);

  const columns = [
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "workFrom", headerName: "Work Criteria", width: 150 },
    {
      field: "tags",
      headerName: "Requirements",
      width: 200,
    },
    {
      field: "action",
      headerName: " ",
      width: 150,
      renderCell: (params) => (
        <Link
          to={{
            pathname: "/company",
            state: { data: params.getValue("name") },
          }}
          className="register"
        >
          <button className="slots-btn">View Slots</button>
        </Link>
      ),
      disableColumnMenu: true,
    },
  ];

  if (start) return <Loader />;

  return (
    <>
      <div className="below-nav">
        <div style={{ width: "90%" }}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} lg={4} alignItems="center" style={{display: "flex"}}>
              <div>
                <h3>RULES AND REGULATIONS</h3>
                <h4 style={{textAlign: "left"}}>
                  The following rules and regulations have to be adhered to
                  strictly during the Internship Expo:
                </h4>
                <ol style={{textAlign: "left"}}>
                  <li>
                    The registration will begin from 26th April, 2021 10PM IST
                  </li>
                  <li>
                    A participant can only register for interviews with any two
                    companies of their choice.
                  </li>
                  <li>
                    The registration for the interviews will be done on a first
                    come first serve basis and no special requests will be
                    entertained.
                  </li>
                  <li>
                    After the registration closes on 30th April, 2021 no change
                    in the choice of company from the participants will be
                    accepted.
                  </li>
                  <li>
                    A participant can only register for the expo and choose the
                    company of their choice after they upload their resume on
                    the portal.
                  </li>
                  <li>
                    After a participant has registered for their choice of
                    company it is mandatory to join the discord server of
                    ‘Internship Expo’21’, The link for the same will be provided
                    once registration is completed.
                  </li>
                  <li>
                    Interviews for registered companies will take place on
                    Discord, details of which will be mailed to you upon
                    registering.
                  </li>
                  <li>
                    E-Cell, VIT reserves the right to make the final call in
                    case of any discrepancy amongst the concerned parties.
                  </li>
                </ol>
              </div>
            </Grid>
            <Grid item xs={12} lg={8}>
              <div className="table">
                <DataGrid
                  density="standard"
                  rows={data}
                  columns={columns}
                  pageSize={10}
                  autoHeight
                  disableSelectionOnClick
                  className={classes.root}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Dialog
        onClose={() => setModal(false)}
        aria-labelledby="simple-dialog-title"
        open={modal}
        PaperProps={{
          className: "modal",
        }}
        disableBackdropClick
      >
        <DialogContent>
          <h3>
            You cannot register for any company without uploading your Resume..
            Please Upload your resume using the dashboard
          </h3>
          <button
            class="sign-log-btn"
            onClick={() => {
              setModal(false);
              history.push("/");
            }}
            style={{ float: "right" }}
          >
            Back to Dashboard
          </button>
        </DialogContent>
      </Dialog>
      {/* <div
        style={{
          alignItems: "center",
          height: "70vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ paddingTop: "200px" }}>
          Registrations opening on 26th April!
        </h1>
      </div> */}
    </>
  );
}
