import mongoose from "mongoose";
import Comment from "../mongoose/schemas/comment.mjs";
import Post from "../mongoose/schemas/post.mjs";

const getAll = async (req, res) => {
    try {
        const {postId} = req.params
       
        const comments = await Comment.find({
            post: postId
        }).populate("user", "name email")
       
        res.json({
            message: "Comments found",
            items: comments
        })
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const create = async (req, res) => {
    try {
        const { content } = req.body;

        const { postId } = req.params
        const user = req.user._id

        const comment = new Comment({
            content,
            post: postId,
            user
        });

        await comment.save();

        res.status(201).json({
            message: "Comment created successfully",
            data: comment,
        });
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.params
        const comment = await Comment.findOneAndUpdate(
            {  _id: id, user: req.user._id },
            { content },
            { new: true }
        )
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({
            message: "Comment updated successfully",
            data: comment,
        });


    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
const remove = async (req, res) => {
    try {
        const { id } = req.params

        const comment = await Comment.findOneAndDelete({ 
            _id: id,
             user: req.user._id })
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({
            message: "Comment deleted successfully",
            data: comment,
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const commentController = {
    getAll,
    create,
    update,
    remove,
}

export default commentController;