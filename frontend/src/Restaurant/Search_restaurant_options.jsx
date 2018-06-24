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
      cuisine_description: "",
      restaurantsList: []
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
      add.push(
        `cuisine_description= "${this.state.cuisine_description
          .slice(0, 1)
          .toUpperCase() + this.state.cuisine_description.slice(1)}"`
      );
    }
    query += add.join(" and ");

    return query;
    console.log(query);
  }

  componentDidMount() {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT camis, dba, phone WHERE camis BETWEEN '41416920' AND '41416940'"
      )
      .then(res => {
        this.setState({
        restaurantList: res.data.map(resturant => <option value = {resturant.dba} /> )
        });
      });
  }

  handleSubmit = e => {
    let query = this.buildQuery();
    axios.get(query).then(res => {
      this.setState({
        restaurants: res.data
      });
    });
  };

  render() {
  //  console.log(this.state.restaurantList)
   
    return (
      <div className="App">
        <input
          type="text"
          name="restaurant_name"
          placeholder="restaurant name"
          value={this.state.restaurant_name}
          onChange={this.handleChange}
          list="dataList1"
        />

        <datalist id="dataList1">
        {this.state.restaurantList}
        </datalist>

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
        <ul className="list">
          {this.state.restaurants.map(restaurant => (
            <li className="container" key={restaurant.camis}>
              <div>
                <Link to={`/${restaurant.camis}`}>{restaurant.dba} </Link>
              </div>
              <div>
                {restaurant.building} {restaurant.street}
              </div>
              <div>{restaurant.boro}, NY</div>
              <div>{restaurant.zipcode}</div>
              <div>{restaurant.cuisine_description}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search_restaurant_options;
