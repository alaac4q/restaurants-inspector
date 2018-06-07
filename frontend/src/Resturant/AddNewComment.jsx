import React, { Component } from 'react';
import axios from 'axios';

class AddNewComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      comment_title:'',
      resturant_id:window.location.href.slice(-8)
    };
  }
  handleNewcomment = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCommentSubmit = e => {
    const { comment, comment_date , resturant_id } = this.state;
  console.log("hello", resturant_id )
    axios
      .post("/user/resturant_id", {
        resturant_id: this.state.resturant_id,
        comment: this.state.comment,
        comment_title: this.state.comment_title,
        comment_date: new Date()
      })
      .then(data => {
        console.log(data)
        this.setState({
          comment: this.state.comment,
          comment_title: this.state.comment_title
        });
      })
      .catch(err => {
        console.log(err);
      });
  };



  render() {
    const { comment, comment_date, comment_title, resturant_id } = this.state;
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
          
          value={resturant_id}
          onChange={this.handleNewcomment}
          name="resturant_id"
          type="text"
        />

     
        <p> this is {resturant_id} </p>
        <p>{d.toString()}</p>
        <button onClick={this.handleCommentSubmit}> add new comment </button>
      </div>
    );
  }
}

export default AddNewComment;
