import React, { ReactElement } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import BudgetEntry from "./components/BudgetEntry/BudgetEntry";
import Overview from "./components/Overview/Overview";
import Expenses from "./components/Expenses/Expenses";
import Savings from "./components/Savings/Savings";

export default function App(): ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/your-finances" component={BudgetEntry} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/savings" component={Savings} />
      </Switch>
      <Footer />
    </Router>
  );
}
