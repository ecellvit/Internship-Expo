import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Loader from "../../Components/Loader/Loader";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Slots.css";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
export default function Slots() {
  const classes = useStyles();
  const [start, setStart] = useState(true);
  const [rows, setRows] = useState([]);
  const [userData, setUserData] = useState({});
  const [del, setDel] = useState([]);
  const history = useHistory();
  useEffect(() => {
    function createData(name, startTime, slotId, companyId) {
      return { name, startTime, slotId, companyId };
    }
    const token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://es-expo.herokuapp.com/users/getAppliedCompanies",
      headers: { "auth-token": token },
    };
    axios(config)
      .then((data) => {
        console.log(data);
        setDel(data.data.appliedCompanies);
        const array = [];
        for (let i = 0; i < data.data.appliedCompanies.length; i++) {
          console.log(data.data.appliedCompanies[i].startTime);
          array.push(
            createData(
              data.data.appliedCompanies[i].companyName,
              data.data.appliedCompanies[i].startTime,
              data.data.appliedCompanies[i].slotId,
              data.data.appliedCompanies[i].companyId
            )
          );
        }
        const getData = async () => {
          var token = localStorage.getItem("token");
          axios
            .get("https://es-expo.herokuapp.com/users/profile", {
              headers: { "auth-token": token },
            })
            .then((data) => {
              console.log(data);
              setUserData(data.data);
              setStart(false);
            })
            .catch((err) => {
              console.log(err.response.data);
              setStart(false);
            });
        };
        if (localStorage.getItem("token") == null) history.push("/");
        else
          getData().then(() => {
            setRows(array);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeCompany = (e) => {
    var token = localStorage.getItem("token");
    var arr = e.target.value.split(",");
    console.log(arr);
    var config = {
      method: "delete",
      url: "https://es-expo.herokuapp.com/users/removeApplied",
      headers: { "auth-token": token },
      data: { slotId: arr[0], companyId: arr[1] },
    };
    axios(config)
      .then((d) => {
        console.log(d);
        alert("Successfully removed");
      })
      .catch((err) => {
        console.log(err);
        alert("The registration has been removed. Please refresh.");
      });
  };
  if (start) return <Loader />;

  return (
    <>
      <div className="below-nav slots-landing">
        <div className="user-details">
          <div className="user">
            <h3> Name: </h3>
            <h3> {userData?.name}</h3>
          </div>
          <div className="user">
            <h3> Email: </h3>
            <h3>{userData?.email}</h3>
          </div>
          <div className="user">
            <h3> Phone Number: </h3>
            <h3>{userData?.phoneNo}</h3>
          </div>
          <div className="user">
            <h3> Resume Link: </h3>
            <h3>{userData?.resumeLink}</h3>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.startTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      value={[row.slotId, row.companyId]}
                      onClick={removeCompany}
                    >
                      Remove
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
