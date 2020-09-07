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
      restaurantBoro: [],
      restaurantList:[],
      cuisine_descriptionList: [],
      cuisineList:[]
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getRestaurantList = () => {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT boro"
      )
      .then(res => {
        this.setState({
          restaurantBoro: res.data.map(resturant => (
            <option value={resturant.boro} />
          ))
        });
      });
  }

  getCuisine_descriptionList = () => {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT dba"
      )
      .then(res => {
        this.setState({
          restaurantList: res.data.map(resturant => (
            <option value={resturant.dba} />
          ))
        });
      });
  }

  getCuisineList = () => {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT cuisine_description"
      )
      .then(res => {
        this.setState({
          cuisineList: res.data.map(resturant => (
            <option value={resturant.cuisine_description} />
          ))
        });
      });
  }

  componentDidMount(){
    this.getRestaurantList()
    this.getCuisine_descriptionList()
    this.getCuisineList()
  }


  buildQuery() {
    let add = [];
    let query =
      "https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT DISTINCT camis, dba, building, street,boro, zipcode, phone , cuisine_description WHERE ";
    if (this.state.restaurant_name) {
      add.push(`dba= "${this.state.restaurant_name.toUpperCase()}"`);
    }
    if (this.state.boro) {
      add.push(`boro= "${this.state.boro}"`);
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
    e.preventDefault()
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
        <form onSubmit={this.handleSubmit}>
          <input
            id = "restaurant_name"
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
            placeholder="NYC Boro"
            value={this.state.boro}
            onChange={this.handleChange}
            list="dataList2"
          />
          <datalist id="dataList2">{this.state.restaurantBoro}</datalist>
          
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
            list="dataList3"
          />
          <datalist id="dataList3">{this.state.cuisineList}</datalist>

          <button type="submit"> Check </button>
          
          </form>
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
    );
  }
}

export default Search_restaurant_options;
