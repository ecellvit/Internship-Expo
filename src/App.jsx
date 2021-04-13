import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Authenticate from "./Pages/Authenticate/Authenticate";
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Register/Register";
import Slots from "./Pages/Slots/Slots";
import Company from "./Pages/Company/Company";

function App() {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  const [type, setType] = useState("success");

  const snack = (type, text) => {
    setText(text);
    setType(type);
    setOpen(true);
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => <Authenticate {...props} snackbar={snack} />}
        />
        <div className="landing">
          <Navbar />
          <Switch>
            <Route
              path="/dashboard"
              component={(props) => <Landing {...props} snackbar={snack} />}
            />
            <Route
              path="/register"
              component={(props) => <Register {...props} snackbar={snack} />}
            />
            <Route
              path="/slots"
              exact
              component={(props) => <Slots {...props} snackbar={snack} />}
            />
            <Route
              path="/company"
              exact
              component={(props) => <Company {...props} snackbar={snack} />}
            />
          </Switch>
          <Footer />
        </div>
      </Switch>
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
    </Router>
  );
}

export default App;
