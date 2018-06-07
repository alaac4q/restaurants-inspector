import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Search_Resturant from "./Search_Resturant.jsx";
import ReactDOM from "react-dom";
import AddNewComment from './AddNewComment.jsx';
 
class Check_rest_name extends React.Component {
  constructor() {
    super();

    this.state = {
      violations: [],
      resturantName: []
    };
  }

  getViolation() {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT dba, building, violation_description, inspection_date 
          WHERE camis = "${window.location.href.slice(
            -8
          )}" and critical_flag = "Critical"`
      )
      .then(res => {
        this.setState({ violations: res.data });
      });
  }

  resturantDescription() {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT 
        DISTINCT camis, dba, building, street, zipcode, phone , cuisine_description
         WHERE camis="${window.location.href.slice(-8)}"`
      )
      .then(res => {
        this.setState({ resturantName: res.data });
      });
  }

  componentDidMount() {
    this.getViolation();
    this.resturantDescription();
  }

  render() {
    return (
      <div className="App">
        {this.state.resturantName.map(rest => (
          <li key={rest.camis}>
            {rest.dba}
            {rest.building} {rest.street} NYC, NY {rest.zipcode} {"     "}{" "}
            {rest.cuisine_description}
          </li>
        ))}

        <ul>
          {this.state.violations.map(violation => (
            <li key={violation.camis}>
              {violation.violation_description} ,
              {violation.inspection_date} ,
            </li>
          ))}
        </ul>
   
        <AddNewComment  />
        <Link to = '/'> search more resturants </Link>

      </div>

    );
  }
}

export default Check_rest_name;
