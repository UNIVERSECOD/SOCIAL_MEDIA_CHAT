import mongoose, { Types } from "mongoose";


const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  likes: {
    type: [Types.ObjectId],
    ref: "User"
  },
  comments: {
    type: [Types.ObjectId],
    ref: "Comment"
  },
  img: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post

