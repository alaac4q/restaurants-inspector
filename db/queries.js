

const createComment = (req, res, next) => {
db
.none(
      'INSERT INTO Forum_Comments (comment_id ,resturant_id ,comment_title ,comment ,comment_date ) VALUES (${comment_id], ${resturant_id}, ${comment_title},${comment}, ${comment_date})',
      {
        comment_id:req.body.comment_id,
        resturant_id: req.body.resturant_id,
        comment_title:req.body.comment_title,
        comment_date: req.body.comment_date,
        comment: req.body.comment
      }
    )
    console.log('love love love')
    .then(() => {
      res.status(200).json({
        message: 'Successfully created new Comment'
      });
    })
    .catch(err => {
      console.log('love love love')
      console.log('error creating comment ', err);
      res.status(500).send(`Error creating new Comment:  ${err}`);
    });
    console.log('love love love')

};

// const getComments = (req, res) => {
//   db
//     .any(
//       'SELECT username, first_name, last_name, comment_id , resturant_id , comment, comment_date, comment_title FROM users INNER JOIN Forum_Comments ON Forum_Comments.user_id = users.id INNER JOIN Resturants ON forum_comments.comment_id = Resturants.post_id WHERE forum_posts.post_id = ${post_id} ORDER BY post_date',
//       {
//         post_id: req.params.post_id
//       }
//     )
//     .then(data =>
//       res.status(200).json({
//         data: data,
//         status: 'success',
//         message: 'successfully '
//       })
//     )
//     .catch(err => {
//       console.log(`not getting  posts:  ${err}`);
//     });
// };


module.exports = {

  createComment
  // getComments,
 
};
