import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Authenticate from "./Pages/Authenticate/Authenticate";
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Register/Register";
import Slots from "./Pages/Slots/Slots";
import Company from "./Pages/Company/Company";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={(props) => <Authenticate {...props} />}
        />
        <div className="landing">
          <Navbar />
          <Route
            path="/dashboard"
            component={(props) => <Landing {...props} />}
          />
          <Route
            path="/register"
            component={(props) => <Register {...props} />}
          />
          <Route
            path="/slots"
            exact
            component={(props) => <Slots {...props} />}
          />
          <Route
            path="/company"
            exact
            component={(props) => <Company {...props} />}
          />
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
