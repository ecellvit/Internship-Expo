import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { makeStyles } from "@material-ui/core";
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
  const [start, setStart] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get("https://es-expo.herokuapp.com/users/checkResume", {
  //       headers: { "auth-token": token },
  //     })
  //     .then((data) => {
  //       setModal(!data.data.resumeUploaded);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  //   axios
  //     .get("https://es-expo.herokuapp.com/company/getAll", {
  //       headers: { "auth-token": token },
  //     })
  //     .then((data) => {
  //       // console.log(data);
  //       var arr = [];
  //       data.data.forEach((t, index) => {
  //         arr.push({ ...t, id: index });
  //       });
  //       setData(arr);
  //       setStart(false);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       setStart(false);
  //     });
  // }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      disableColumnMenu: true,
      filterable: false,
    },
    {
      field: "workFrom",
      headerName: "Work Criteria",
      width: 140,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "tags",
      headerName: "Requirements",
      width: 400,
    },
    {
      field: "totalAvailable",
      headerName: "Available Slots",
      width: 120,
      disableColumnMenu: true,
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
          <button
            className="slots-btn"
            disabled={params.getValue("totalAvailable") === 0}
          >
            View Slots
          </button>
        </Link>
      ),
      disableColumnMenu: true,
    },
  ];

  if (start) return <Loader />;

  return (
    <>
      <div className="below-nav">
        {/* <div className="table">
          <h3>
            YOU CAN BOOK SLOTS FOR INTERVIEWS, FOR A MAXIMUM OF TWO COMPANIES
          </h3>
          <DataGrid
            density="standard"
            rows={data}
            columns={columns}
            pageSize={60}
            autoHeight
            disableSelectionOnClick
            className={classes.root}
          />
          <button className="download-btn">
            <a href="/Companies.pdf" download>
              Download Full List
            </a>
          </button>
        </div> */}
        <h2>Slot Booking has ended!</h2>
      </div>
      {/* <Dialog
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
      </Dialog> */}
    </>
  );
}
