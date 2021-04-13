import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
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

export default function Register() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [here, setHere] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    function createData(name, requirements, workplace, tags) {
      return { name, requirements, workplace, tags };
    }
    const token = localStorage.getItem("token");
    axios
      .get("https://es-expo.herokuapp.com/company/getAll", {
        headers: { "auth-token": token },
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setHere(true);
        var array = [];
        for (let i = 0; i < data.data.length; i++) {
          console.log(data.data[i].name);
          array.push(
            createData(
              data.data[i].name,
              data.data[i].description,
              data.data[i].workFrom,
              data.data[i].tags
            )
          );
        }
        console.log(array);
        setRows(array);
      })
      .catch((err) => {
        console.log(err);
        alert("No slots available")
      });
  }, []);

  const handleClick=(e)=>{
   console.log(e.target.value);

  }
  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Companies Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Work from</StyledTableCell>
              <StyledTableCell align="right">Tags</StyledTableCell>
              <StyledTableCell align="right">View Slots</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.requirements}
                </StyledTableCell>
                <StyledTableCell align="right">{row.workplace}</StyledTableCell>
                <StyledTableCell align="right">{row.tags}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={{
                      pathname: "/company",
                      state: {
                        data: row.name,
                      },
                    }}
                  >
                    <button value={row.name} onClick={handleClick}>
                      View
                    </button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
