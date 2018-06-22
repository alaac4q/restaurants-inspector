import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Check_rest_name from "./Check_rest_name.jsx";
import ReactDOM from "react-dom";

class Search_restaurant_options extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      violations: [],
      restaurant_name: "",
      boro: "",
      zipcode: "",
      cuisine_description: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buildQuery() {
    let add = [];
    let query =
      "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT camis, dba, building, street,boro, zipcode, phone , cuisine_description WHERE ";
    if (this.state.restaurant_name) {
      add.push(`dba= "${this.state.restaurant_name.toUpperCase()}"`);
    }
    if (this.state.boro) {
      add.push(`boro= "${this.state.boro.toUpperCase()}"`);
    }
    if (this.state.zipcode) {
      add.push(`zipcode= "${this.state.zipcode}"`);
    }
    if (this.state.cuisine_description) {
      add.push(`cuisine_description= "${this.state.cuisine_description}"`);
    }
    query += add.join(" and ");

    return query;
    console.log(query);
  }

  handleSubmit = e => {
    let query = this.buildQuery();
    axios.get(query).then(res => {
      console.log(res);
      this.setState({
        restaurants: res.data
      });
    });
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          name="restaurant_name"
          placeholder="restaurant name"
          value={this.state.restaurant_name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="boro"
          placeholder="City"
          value={this.state.boro}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          value={this.state.zipcode}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="cuisine_description"
          placeholder="cuisine"
          value={this.state.cuisine_description}
          onChange={this.handleChange}
        />

        <button onClick={this.handleSubmit}>{"    "}</button>
        <ul className = "list">
          {this.state.restaurants.map(restaurant => (
            <li key={restaurant.camis}>
              <Link to={`/${restaurant.camis}`}> {restaurant.dba} </Link>
              {restaurant.building} {restaurant.street} {restaurant.boro}, NY{" "}
              {restaurant.zipcode} {"     "} {restaurant.cuisine_description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search_restaurant_options;
