import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Check_rest_name from "./Check_rest_name.jsx";
import ReactDOM from "react-dom";
import Search_restaurant_options from "./Search_restaurant_options.jsx";

class Search_Restaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      violations: [],
      restaurant_name: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT 
         DISTINCT camis, dba, building, street,boro, zipcode, phone , cuisine_description
         WHERE dba="${this.state.restaurant_name.toUpperCase()}"`
      )
      .then(res => {
        this.setState({
          restaurants: res.data
        });
      });
  };

  render() {
    return (
      <div className="mainSearch">
        {/* <input 
          type="text"
          name="restaurant_name"
          value={this.state.restaurant_name}
          placeholder="restaurant name"
          onChange={this.handleChange}
        />

        <button onClick={this.handleSubmit}>{"  "}</button> */}
        <ul>
          {this.state.restaurants.map(restaurant => (
            <li className="flex-container" key={restaurant.camis}>
              <div>
                {" "}
                <Link to={`/${restaurant.camis}`}>{restaurant.dba} </Link>{" "}
              </div>
              <div>{restaurant.building}</div>
              <div>{restaurant.street} </div>
              <div>{restaurant.boro}, NY </div>
              <div>
                {restaurant.zipcode} {"     "}{" "}
              </div>
              <div> {restaurant.cuisine_description}</div>
            </li>
          ))}
        </ul>
        <Search_restaurant_options />
      </div>
    );
  }
}

export default Search_Restaurant;
