import Authenticate from "./Pages/Authenticate/Authenticate";
import Landing from "./Pages/Landing/Landing";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./Pages/Register/Register";
import Slots from "./Pages/Slots/Slots";
import Company from "./Pages/Company/Company";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Authenticate} />
          <div className="landing">
            <Navbar />
            <Switch>
              <Route path="/dashboard" component={Landing} />
              <Route path="/register" component={Register} />
              <Route path="/slots" exact component={Slots} />
              <Route path="/company" exact component={Company} />
            </Switch>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
