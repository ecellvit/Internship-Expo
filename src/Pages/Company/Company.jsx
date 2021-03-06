import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Loader from "../../Components/Loader/Loader";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./Company.css";
import { Link, useHistory } from "react-router-dom";
import LOGO from "../../Assets/logo.png";

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
  const [text, setText] = useState("");
  const [type, setType] = useState("success");
  const [modal, setModal] = useState(false);

  const history = useHistory();

  const snackbar = (type, text) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  const classes = useStyles();

  useEffect(() => {
    if (!props.location.state) {
      history.push("/");
      return;
    }

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
    axios(config)
      .then((data) => {
        companyId = data.data._id;
        companyName = data.data.name;
        setData(data.data);
        const array = [];
        for (let i = 0; i < data.data.slots.length; i++) {
          // console.log(data.data.slots[i].startTime);
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
        if (array.length === 0) snackbar("error", "No Slots Available");
        setStart(false);
      })
      .catch((err) => {
        // console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    // console.log(e.target.value);
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
        // console.log(res.data);
        setModal(true);
      })
      .catch((err) => {
        // console.log(err);
        snackbar("error", err.response.data.errorMessage);
      });
  };

  if (start) return <Loader />;

  return (
    <>
      <div className="below-nav company-page">
        <div style={{ width: "100%" }}>
          <div className="company">
            <div className="company-logo">
              <img
                src={data.logoLink === "" ? LOGO : data.logoLink}
                alt="logo"
              />
            </div>
            <h1> {data.name}</h1>
            <h3 className="company-details" style={{ fontWeight: "300" }}>
              {data.description}
            </h3>
            <h3 className="company-details" style={{ fontWeight: "400" }}>
              {data.workFrom === "both"
                ? "In-Office/Work from Home"
                : data.workFrom}
            </h3>
            <h3 className="company-details">
              Office Location:{" "}
              {data.websiteLink === "" ? "Not Specified" : data.websiteLink}
            </h3>
            <div className="tags">
              <h3 className="company-details" style={{ fontWeight: "300" }}>
                Tags:&nbsp;
              </h3>
              {data.tags.map((ele) => {
                return (
                  <h4 className="company-tags" style={{ fontWeight: "300" }}>
                    {ele}
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
                  <StyledTableCell align="center">Available</StyledTableCell>
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
                      {/* {console.log(row.slotId)} */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <h3>All the Timings Specified are for 2nd May, 2021</h3>
          </div>
          <br />
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
                Thank you for registering, the procedure for the entire expo
                will be mailed to you by Saturday, 1st May
              </h3>
              <button
                class="sign-log-btn"
                onClick={() => {
                  setModal(false);
                  history.push("/register");
                }}
                style={{ float: "right" }}
              >
                Confirm
              </button>
            </DialogContent>
          </Dialog>
          <Link to="/register">
            <button>Back to Companies</button>
          </Link>
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
      </div>
    </>
  );
}
