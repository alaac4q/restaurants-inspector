import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddNewComment from './AddNewComment.jsx';

class CommentList extends Component {
    constructor() {
      super();
      this.state = {
        comments: []
      };
    }
    handleNewcomment = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
  
    
    render() {

    
    }
  }
  
  export default CommentList;
  