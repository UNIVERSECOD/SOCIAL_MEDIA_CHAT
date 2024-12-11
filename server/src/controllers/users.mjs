import Friendship from "../mongoose/schemas/friend.mjs";
import User from "../mongoose/schemas/user.mjs";

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name } = req.body;
        const user = await User.findById(userId).select("-password -forgotPasswordToken -forgotPasswordTokenExpires");
        if (!user) return res.status(404).json({ message: "User not found" });
        if (name) user.name = name;
        if (req.file) {
            user.avatar = req.file.path;
        }
        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const { sort, search, page = 1, limit = 10, userId } = req.query; 

        
        const skip = (page - 1) * limit;

        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "i" } },
            ];
        }

        const sortObj = {};
        if (sort) {
            const [field, order] = sort.split("-");
            sortObj[field] = order === "asc" ? 1 : -1;
        }

        const users = await User.find(filter)
            .select("-password -forgotPasswordToken -forgotPasswordTokenExpires")
            .sort(sortObj)
            .skip(skip)
            .limit(Number(limit));

        const usersWithFriendshipStatus = await Promise.all(users.map(async (user) => {
            const isFriend = req.user.friends.includes(user._id);
            const hasAnyRequest = false;            
            const friendship = await Friendship.findOne({
                $or: [
                    { sender: userId, receiver: user._id },
                    { sender: user._id, receiver: userId },
                ],
                status: { $in: ["pending", "accepted"] },


            });

            return {
                ...user.toObject(),
                friendshipStatus: friendship ? friendship.status : "none", 
            };
        }));

        const totalUsers = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers / limit);

        if (!usersWithFriendshipStatus.length) {
            return res.status(404).json({ message: "No users found" });
        }

        console.log("Query Params:", { page, search, sort });
        console.log("Users Data with Friendship:", usersWithFriendshipStatus);

        res.json({
            message: "Users retrieved successfully",
            data: usersWithFriendshipStatus,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: Number(page),
                limit: Number(limit),
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



export {
    updateUser,
    getUser,
};
