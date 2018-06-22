
const db = require("./index");

const createComment = (req, res) => {
  db.none(
    "INSERT INTO Forum_Comments (restaurant_id, comment_title, comment, comment_date) VALUES (${restaurant_id},${comment_title},${comment},${comment_date})",
    {
      comment_id: req.body.comment_id,
      restaurant_id: req.body.restaurant_id,
      comment_title: req.body.comment_title,
      comment: req.body.comment,
      comment_date: req.body.comment_date
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Successfully created new Comment"
      });
    })
    .catch(err => {
      console.log("error creating comment ", err);
      res.status(500).send(`Error creating new Comment:  ${err}`);
    });
};

const getComments = (req, res) => {
  db.any(
    "SELECT comment_title, comment, comment_date FROM Forum_Comments WHERE restaurant_id = ${restaurant_id}", 
    {restaurant_id: req.params.restaurant_id})
      .then(data =>
        res.status(200).json({
          data: data,
          status: "success",
          message: "successfully "
        }))
      .catch(err => {
        console.log(`not getting  posts:  ${err}`);
        res.status(500).send(`Error getting comments:  ${err}`);
      })
};

module.exports = {
  createComment,
  getComments
};
