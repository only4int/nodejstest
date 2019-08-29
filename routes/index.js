const userController = require('../controllers').users
const postController = require('../controllers').posts
const likeController = require('../controllers').likes
const requestController = require('../controllers').requests

module.exports = (app) => {
  //users
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
  app.get('/api/users/posts', userController.listWithPost);
  app.get('/api/users/:userId', userController.getUserDetails);
  app.put('/api/users/:userId', userController.update);
  app.delete('/api/users/:userId', userController.destroy);
  //posts
  app.post('/api/posts/:userId', postController.create);  
  app.get('/api/posts', postController.list);
  app.get('/api/posts/:postId', postController.getPostDetails);
  app.put('/api/posts/:postId', postController.update);
  app.delete('/api/posts/:postId', postController.destroy);  
  //likes
  app.post('/api/likes/:userId/:postId', likeController.create); 
  app.delete('/api/likes/:likeId', likeController.destroy);
  //requests
  app.post('/api/requests/:userId', requestController.create); 
}
/* GET home page. */
