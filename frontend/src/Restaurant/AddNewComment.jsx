import React, { Component } from "react";
import axios from "axios";

class AddNewComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      comment_title: "",
      restaurant_id: window.location.href.slice(-8)
    };
  }
  handleNewcomment = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCommentSubmit = e => {
    const { comment, comment_date, restaurant_id } = this.state;
    console.log("hello", restaurant_id);
    axios
      .post("/users/:restaurant_id", {
        restaurant_id: this.state.restaurant_id,
        comment: this.state.comment,
        comment_title: this.state.comment_title,
        comment_date: new Date()
      })
      .then(res => {
        this.props.getCommentToAppear()
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { comment, comment_date, comment_title, restaurant_id } = this.state;
    var d = new Date();
    return (
      <div className="add-interview-form">
        <p>Comment</p>
        <textarea
          value={comment}
          onChange={this.handleNewcomment}
          name="comment"
          type="textarea"
        />
        <input
          value={comment_title}
          onChange={this.handleNewcomment}
          name="comment_title"
          type="text"
        />
        <input
          value={restaurant_id}
          onChange={this.handleNewcomment}
          name="restaurant_id"
          type="text"
        />

        <p> this is {restaurant_id} </p>
        <p>{d.toString()}</p>
        <button className = 'button' onClick={this.handleCommentSubmit}> add new comment </button>
      </div>
    );
  }
}

export default AddNewComment;
