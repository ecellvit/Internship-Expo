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
  const [del, setDel] = useState([]);
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
        setRows(array);
        setStart(false);
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
      <TableContainer component={Paper}>
        {console.log(del)}
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.startTime}</StyledTableCell>
                <StyledTableCell align="right">
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
    </>
  );
}
