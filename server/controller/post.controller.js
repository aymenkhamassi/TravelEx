
const posts = require('../models/post.model')



//?=================Get All posts===============
module.exports.getAll = (request, response) => {
    posts.find()
        .then(posts => response.json(posts))
        .catch(err => response.json(err))
}


//?=================Get One post==============
module.exports.findOnePost = (request, response) => {
    posts.findOne({ _id: request.params.id })
        .then(post => {response.json(post)})
        .catch(err => response.json(err))
}

//?=================Create Post===============
module.exports.createPost = (request, response) => {
  console.log(request.body)
    const { type, content, rating, image, localisation, creator, creatorUserName } = request.body;
    posts.create({
        type,
        content,
        rating,
        image,
        localisation,
        creator,
        creatorUserName,
    }

    )
        .then(post => response.json(post))
        .catch(err => response.status(400).json(err))
}



//?=================Update Post===============
module.exports.updatePost = (request, response) => {
    posts.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updatedPost => response.json(updatedPost))
        .catch(err => response.status(400).json(err))
}




//?=================Delete Post===============
module.exports.deletePost = (request, response) => {
    posts.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

// *! =============incrementlikes ^================
module.exports.incrementLikes = async (req, res) => {
    try {
      const Id = req.params.id;
      const updatedPost = await posts.findOneAndUpdate(
        { _id: Id },
        { $inc: { likes: 1 } },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //*!================ Decrement the likes of a tree
  module.exports.decrementLikes = async (req, res) => {
    try {
      const Id = req.params.id;
      const updatedPost = await posts.findOneAndUpdate(
        { _id: Id, likes: { $gt: 0 } },
        { $inc: { likes: -1 } },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//?===================Create Comment ==============
module.exports.createReaction = (request, response) => {
    posts.findOneAndUpdate(
        { _id: request.params.id },
        { $push: { comments: request.body } },
        {
            new: true,
            runValidators: true,
        }
    )
        .then(person => { response.json(person) })
        .catch(err => response.status(400).json(err))
}

//?=================Update Comment===============
module.exports.updateComment = (request, response) => {
    posts.findOneAndUpdate(
        { _id: request.params.id, "comments._id": request.body._id },
        { $set: { "comments.$.comment": request.body.comment } },
        { new: true, runValidators: true }
    )
        .then(updatedPost => response.json(updatedPost))
        .catch(err => response.status(400).json(err))
}


//?=================Delete comment===============
module.exports.deleteComment = (request, response) => {
    posts.findOneAndUpdate({ _id: request.params.id }, { $pull: { comments: { _id: request.body } } })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}



