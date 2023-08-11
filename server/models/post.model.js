const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "{PATH} is required"],
    },
    content: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [10, "{PATH} must be at least 10 chars"],
        trim: true

    },
    rating: {
        type: Number,
    },

    image: {
        type: String,
        default: "default.jpg"
    },

    localisation: {
        type: String,
        required: [true, "{PATH} is required"],
    },

    likes: { type: Number, default: 0, },

    creator: {
        type: String,
        required: true,
    },

    creatorUserName: {
        type: String,
        required: [true, '{PATH} is required']
    },
    isAccept: {
        type: Boolean,
        default: false
    },

    comments: [
        {
            creator: {
                type: String,
                required: true,
            },
            creatorUserName: {
                type: String,
                required: [true, '{PATH} is required']
            },
            comment: {
                type: String,
                minlength: [10, "{PATH} must be at least 10 chars"],
                trim: true
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }
    ],

}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;