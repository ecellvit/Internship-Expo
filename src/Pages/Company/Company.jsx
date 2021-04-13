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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Company.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [start, setStart] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2]  =useState(false);
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
        setStart(false);
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
        setOpen2(true);
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  if (start) return <Loader />;

  return (
    <>
      <div className="below-nav company-page">
        <div className="company">
          <h1> {data.name}</h1>
          <h3 className="company-details" style={{ fontWeight: "300" }}>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            sequi, laborum ea quidem maiores illum omnis iusto explicabo
            recusandae, officia sapiente numquam error, ducimus facilis nam
            saepe at ex quibusdam.
          </h3>
          <div className="tags">
            <h3 className="company-details" style={{ fontWeight: "300" }}>
              Tags:&nbsp;
            </h3>
            {data.tags.map((ele) => {
              return (
                <h4 className="company-tags" style={{ fontWeight: "300" }}>
                  #{ele}
                </h4>
              );
            })}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center">End Time</StyledTableCell>
                <StyledTableCell align="center">Availabe</StyledTableCell>
                <StyledTableCell align="center">Register</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.start}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.start}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.end}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.available}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button value={row.slotId} onClick={handleClick}>
                      Register
                    </button>
                    {console.log(row.slotId)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            severity="error"
          >
            You have already registered for this company!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open2}
          autoHideDuration={2000}
          onClose={() => {
            setOpen2(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpen2(false);
            }}
            severity="success"
          >
          Registered!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
