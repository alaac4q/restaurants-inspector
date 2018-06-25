import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";


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
      restaurantsList: [],
      cuisine_descriptionList: []
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT camis, dba"
      )
      .then(res => {

        this.setState({
          restaurantList: res.data.map(resturant => (
            <option value={resturant.dba} />
          ))
        });
      });
  }

  // componentDidMount() {
  //   axios
  //     .get(
  //       "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT camis, dba"
  //     )
  //     .then(res => {
  //       this.setState({
  //         cuisine_descriptionList: res.data.map(resturant => (
  //           <option value={resturant.cuisine_description} />
  //         ))
  //       });
  //     });
  // }

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

  handleSubmit = e => {
    let query = this.buildQuery();
    axios.get(query).then(res => {
      this.setState({
        restaurants: res.data
      });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="innerApp">
          <input
            type="text"
            name="restaurant_name"
            placeholder="restaurant name"
            value={this.state.restaurant_name}
            onChange={this.handleChange}
            list="dataList1"
          />

          <datalist id="dataList1">{this.state.restaurantList}</datalist>

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
            // list="dataList2"
          />

          {/* <datalist id="dataList2">
            {this.state.cuisine_descriptionList}
          </datalist> */}

          <button onClick={this.handleSubmit}>{"    "}</button>
          <ul className="list-group">
            {this.state.restaurants.map(restaurant => (
              <li className="list-group-item" key={restaurant.camis}>
                <Link to={`/${restaurant.camis}`}>
                  {restaurant.dba}
                  <p>
                    {restaurant.building} {restaurant.street}
                  </p>
                  {restaurant.boro}, NY
                  {restaurant.zipcode}
                  {restaurant.cuisine_description}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Search_restaurant_options;
