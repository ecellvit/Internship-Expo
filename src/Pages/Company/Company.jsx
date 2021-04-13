// export default function Company() {
//
//   return <p>hi</p>;
// }
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar"
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

var companyId;
var companyName;

export default function CustomizedTables(props) {
  const [data, setData] = useState();
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    function createData(start, end, available, slotId) {
      return { start, end, available, slotId };
    }

    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: "https://es-expo.herokuapp.com/company/getData",
      data: { name: props.location.state.data },
      headers: { "auth-token": token },
    };
    console.log(props.location.state.data);
    axios(config)
      .then((data) => {
        companyId = data.data._id;
        companyName = data.data.name;
        console.log(companyId);
        console.log(companyName);
        console.log(data.data);
        setData(data.data);
        const array = [];
        for (let i = 0; i < data.data.slots.length; i++) {
          console.log(data.data.slots[i].startTime);
          array.push(
            createData(
              data.data.slots[i].startTime,
              data.data.slots[i].endTime,
              data.data.slots[i].available,
              data.data.slots[i]._id
            )
          );
        }
        setRows(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    console.log(e.target.value);
    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: "https://es-expo.herokuapp.com/users/apply",
      data: {
        slotId: e.target.value,
        companyName: companyName,
        companyId: companyId,
      },
      headers: { "auth-token": token },
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Navbar />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Start Time</StyledTableCell>
            <StyledTableCell align="right">End Time</StyledTableCell>
            <StyledTableCell align="right">Availabe</StyledTableCell>
            <StyledTableCell align="right">Register</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.start}>
              <StyledTableCell component="th" scope="row">
                {row.start}
              </StyledTableCell>
              <StyledTableCell align="right">{row.end}</StyledTableCell>
              <StyledTableCell align="right">{row.available}</StyledTableCell>
              <StyledTableCell align="right">
                <button value={row.slotId} onClick={handleClick}>Register</button>
                {console.log(row.slotId)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
