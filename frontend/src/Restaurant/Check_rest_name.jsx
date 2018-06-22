import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Search_Restaurant from "./Search_Restaurant.jsx";
import ReactDOM from "react-dom";
import AddNewComment from "./AddNewComment.jsx";

class Check_rest_name extends React.Component {
  constructor() {
    super();

    this.state = {
      violations: [],
      restaurantName: [],
      restaurant_id: window.location.href.slice(-8)
    };
  }
  

  componentDidMount() {
    this.restaurantDescription();
    this.getViolation();
    this.getCommentToAppear();
  }

  getViolation = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT dba, building, violation_description, inspection_date 
          WHERE camis = "${window.location.href.slice(
            -8
          )}" and critical_flag = "Critical"`
      )
      .then(res => {
        this.setState({ violations: res.data.map(violation => (
          <li key={violation.camis}>
            {violation.violation_description} ,
            {violation.inspection_date} ,
          </li>
        )) });
      });
  }

  restaurantDescription = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT 
        DISTINCT camis, dba, building, street,boro, zipcode, phone , cuisine_description
         WHERE camis="${window.location.href.slice(-8)}"`
      )
      .then(res => {
        this.setState({ restaurantName: res.data.map(rest => (
          <li key={rest.camis}>
            {rest.dba}
            {rest.building} {rest.street} {rest.boro}, NY {rest.zipcode}{" "}
            {"     "} {rest.cuisine_description}
          </li>
        )) });
      });
  }

 

  getCommentToAppear = () => {
    axios
      .get(`/users/${window.location.href.slice(-8)}/comments`)
      .then(res => {
        this.setState({
          comments: res.data.data.map(comment => (
            <li>
              {comment.comment_title} ,
              {comment.comment},
              {comment.comment_date}
            </li>
          ))
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <div className="App">
         {this.state.restaurantName}
      
        <ul>
          {this.state.violations}
        </ul>
     
        <AddNewComment
          commentList={this.commentList}
          getCommentToAppear={() => this.getCommentToAppear()}
        />
        <div>{this.state.comments}</div>;


        <Link to="/"> search more restaurants </Link>
      </div>
    );
  }
}

export default Check_rest_name;
