import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const [rows, setRows] = useState([]);
  useEffect(() => {
    function createData(name, startTime) {
      return { name, startTime };
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
        const array = [];
        for (let i = 0; i < data.data.appliedCompanies.length; i++) {
          console.log(data.data.appliedCompanies[i].startTime);
          array.push(
            createData(
              data.data.appliedCompanies[i].companyName,
              data.data.appliedCompanies[i].startTime
            )
          );
        }
        setRows(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <p>In progress</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.startTime}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
