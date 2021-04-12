import Authenticate from "./Pages/Authenticate/Authenticate";
import Landing from "./Pages/Landing/Landing";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Slots from "./Pages/Slots/Slots";
import Company from "./Pages/Company/Company";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Authenticate} />
          <Route path="/dashboard" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/slots" exact component={Slots} />
          <Route path="/company" exact component={Company} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
