const PostController=require('../controller/post.controller')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
 //!=============create/update Post=========
 module.exports=(app)=>{
    app.get("/api/Post", PostController.getAll);// Find All Posts
    app.get("/api/Post/:id", PostController.findOnePost); // Find One Post
    app.post("/api/Post/create",upload.single('image'), PostController.createPost);// Create a post
    app.put("/api/Post/:id/post",upload.single('image'), PostController.updatePost); // Update post
    app.delete("/api/Post/:id/edit",PostController.deletePost);//delete post
    // Increment likes
    app.put('/api/Post/:id/increment', PostController.incrementLikes);

    // Decrement likes
    app.put('/api/Post/:id/decrement', PostController.decrementLikes);
    //!=============create/update comment=========
    app.post("/api/Post/comment/:id", PostController.createReaction);// Create comment
    app.put("/api/Post/:id/comment", PostController.updateComment); // Update comment
    app.delete("/api/comment/:id",PostController.deleteComment);//delete comment

}