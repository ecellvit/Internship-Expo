import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import "./Register.css";
import { makeStyles } from "@material-ui/core";

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
  const [start, setStart] = useState(true);

  const classes = useStyles();

  useEffect(() => {
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
      {/* <div className="below-nav">
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
      </div> */}
      <div
        style={{
          alignItems: "center",
          height: "70vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ paddingTop: "200px"}}>Registrations opening on 26th April!</h1>
      </div>
    </>
  );
}
