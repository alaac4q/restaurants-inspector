import React, { Component } from "react";
import axios from "axios";
import AddNewComment from "./AddNewComment.jsx";

class Check_rest_name extends React.Component {
  constructor(){
    super();
    this.state = {
      violations: [],
      restaurantName: [],
      restaurant_id: window.location.href.slice(-8)
    }
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
          )}" and critical_flag = "Critical" ORDER BY inspection_date DESC`
      )
      .then(res => {
        this.setState({
          violations: res.data.map(violation => (
            <li key={violation.camis}>
              <div className = "violation_description"> {violation.violation_description} </div>
              <div className = "violationdate"> {violation.inspection_date.slice(0, 10)} </div>
            </li>
          ))
        });
      });
  };

  restaurantDescription = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$query=SELECT 
        DISTINCT camis, dba, building, street,boro, zipcode, phone , cuisine_description
         WHERE camis="${window.location.href.slice(-8)}"`
      )
      .then(res => {
        this.setState({
          restaurantName: res.data.map(rest => (
            <li className="list-group-item" key={rest.camis}>
              {rest.dba}
              <p className="address">
                {rest.building} {rest.street} {rest.boro}, NY {rest.zipcode}{" "}
              </p>
              {"     "} {rest.cuisine_description}
            </li>
          ))
        });
      });
  };

  getCommentToAppear = () => {
    axios
      .get(`/users/${window.location.href.slice(-8)}/comments`)
      .then(res => {
        this.setState({
          comments: res.data.data.map(comment => (
            <ul>
              <li>
                <div className = "title">{comment.comment_title} </div>
                <div className = "comment">
                  <p>{comment.comment}</p>
                </div>
                <div className = "date">{comment.comment_date.slice(0, 10)} </div>
              </li>
            </ul>
          ))
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
      <div className="AppComAndViolation">
        <ul className="list-group">{this.state.restaurantName}</ul>
        <ul className="list-group-violation">{this.state.violations}</ul>
        <AddNewComment
          commentList={this.commentList}
          getCommentToAppear={() => this.getCommentToAppear()}
        />
        <div className = "commentList">{this.state.comments}</div>
      </div>
      </div>
    )
  }
}

export default Check_rest_name;
