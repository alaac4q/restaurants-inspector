import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Check_rest_name from "./Check_rest_name.jsx";
import ReactDOM from "react-dom";

class Search_Resturant extends React.Component {
  constructor() {
    super();
    this.state = {
      resturants: [],
      violations:[],
      resturant_name: "",
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT 
         DISTINCT camis, dba, building, street, zipcode, phone , cuisine_description
         WHERE dba="${this.state.resturant_name.toUpperCase()}"`
      )
      .then(res => {
        this.setState({
          resturants: res.data,
        });
      });
  };


  render() {

    return (
      <div className="App">
        <input
          type="text"
          name="resturant_name"
          value={this.state.resturant_name}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>check</button>
        <ul >
          {this.state.resturants.map(resturant => (
            <li key={resturant.camis} >
              <Link to={`/${resturant.camis}`}> {resturant.dba} </Link>
              {resturant.building} {resturant.street} NYC, NY{" "}
              {resturant.zipcode} {"     "} {resturant.cuisine_description}
            </li>
          ))}
        </ul>

       

      </div>
    );
  }
}

export default Search_Resturant;
