import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
