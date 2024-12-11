import mongoose from "mongoose";
import User from "../mongoose/schemas/user.mjs";
import Friendship from "../mongoose/schemas/friend.mjs";

const getAllFriends = async (req, res) => {
  try {
    const { sort, search, page = 1, limit = 10 } = req.query;
    const sortObj = {};
    const filter = {
      $or: [
        { user: req.user.id },
        { friend: req.user.id },
      ],
    };

    if (sort) {
      const [field, order] = sort.split("-");
      sortObj[field] = order === "asc" ? 1 : -1;
    }

    if (search) {
      filter.$or.push({
        'user.username': { $regex: search, $options: 'i' },
      });
      filter.$or.push({
        'friend.username': { $regex: search, $options: 'i' },
      });
    }

    const data = await Friendship.find(filter)
      .populate('user', 'username')
      .populate('friend', 'username')
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalCount = await Friendship.countDocuments(filter);

    const items = data.map((item) => ({
      ...item.toObject(),
      user: {
        _id: item.user._id,
        name: item.user.username,
      },
      friend: {
        _id: item.friend._id,
        name: item.friend.username,
      },
    }));

    res.json({
      message: "Friendships found",
      totalCount,
      page: +page,
      limit: +limit,
      items,
    });
  } catch (error) {
    console.error("Error in getAllFriends:", error);
    res.status(500).json({ message: "Server error getting friendships." });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.id;

    // if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    //   return res.status(400).json({ message: "Invalid receiver ID." });
    // }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "Cannot send friend request to yourself." });
    }

    const existingRequest = await Friendship.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists or you are already friends." });
    }

    const friendship = new Friendship({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });

    await friendship.save();
    res.status(201).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    res.status(500).json({ message: "Server error sending friend request." });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid request ID." });
    }

    const request = await Friendship.findById(requestId)
      .populate("sender", "username")
      .populate("receiver", "username");

    if (!request) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    if (request.receiver._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    request.status = 'accepted';
    await request.save();

    await User.findByIdAndUpdate(request.sender._id, {
      $addToSet: { friends: request.receiver._id },
    });

    await User.findByIdAndUpdate(request.receiver._id, {
      $addToSet: { friends: request.sender._id },
    });

    res.json({ message: "Friend request accepted successfully", friend: request.sender });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    res.status(500).json({ message: "Server error accepting friend request." });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid request ID." });
    }

    const request = await Friendship.findByIdAndDelete(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    res.status(200).json({ message: "Friend request rejected successfully." });
  } catch (error) {
    console.error("Error in rejectFriendRequest:", error);
    res.status(500).json({ message: "Server error rejecting friend request." });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const filter = {
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    };

    const requests = await Friendship.find(filter)
      .populate("sender", "username")
      .populate("receiver", "username")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({ message: "Friend requests retrieved successfully", requests });
  } catch (error) {
    console.error("Error in getFriendRequests:", error);
    res.status(500).json({ message: "Server error retrieving friend requests." });
  }
};



const removeFromFriend = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;

    if (currentUserId === userId) {
      return res.status(400).json({ message: "Cannot remove yourself from friends." });
    }

    const friendship = await Friendship.findOneAndDelete({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    });

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found." });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: userId }
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: currentUserId }
    });

    res.status(200).json({ message: "Friendship removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const retractRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { senderId } = req.params;  
    const retractedRequest = await Friendship.findOneAndDelete({
      $or: [
        { sender: userId, receiver: senderId },
        { sender: senderId, receiver: userId },
      ],
    });
    
    if (!retractedRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    res.status(200).json({ message: "Friend request retracted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error retracting friend request." });
  }
};






export default {
  getAllFriends,
  sendFriendRequest,
  getFriendRequests,
  removeFromFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  retractRequest
}