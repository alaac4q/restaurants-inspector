import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Check_rest_name from "./Restaurant/Check_rest_name.jsx";
import Search_Restaurant from "./Restaurant/Search_Restaurant.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

        <Route
          path="/" exact
          render = {(props) => <Search_Restaurant {...props} />}
        />

        <Route
          path="/:id" exact
          render = {(props) => <Check_rest_name {...props} />}
        />

     
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
