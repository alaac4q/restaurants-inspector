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
    if (this.state.comment && this.state.comment_title)
      axios
        .post("/users/:restaurant_id", {
          restaurant_id: this.state.restaurant_id,
          comment: this.state.comment,
          comment_title: this.state.comment_title,
          comment_date: new Date()
        })
        .then(res => {
          this.props.getCommentToAppear();
        })
        .catch(err => {
          console.log(err);
        });
  };

  render() {
    const { comment, comment_title } = this.state;
    var d = new Date();
    return (
      <div className="App">
      <div className="AppComAndViolation">
        <div className="form-group">
          <label for="title">Title</label>
          <input
            class="form-control"
            id="title"
            value={comment_title}
            onChange={this.handleNewcomment}
            name="comment_title"
            type="text"
          />
          <label for="comment">Comment</label>
          <textarea
            class="form-control"
            rows="5"
            id="comment"
            value={comment}
            onChange={this.handleNewcomment}
            name="comment"
            type="textarea"
          />
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={this.handleCommentSubmit}
          >
            add comment
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default AddNewComment;
