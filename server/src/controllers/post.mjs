import Post from '../mongoose/schemas/post.mjs';

const getAll = async (req, res) => {
  try {
    const { sort, search, page = 1, limit = 2 } = req.query;
    const sortObj = {}
    const filter = {
      $or: []
    }
    if (sort) {
      const [field, order] = sort.split("-");
      sortObj[field] = order === "asc" ? 1 : -1;
    }

    if (search) {
      filter.$or.push({ title: { $regex: search, $options: 'i' } });
      filter.$or.push({ content: { $regex: search, $options: 'i' } });
      filter.$or.push({ tags: { $regex: search, $options: 'i' } });
    }

    const data = await Post.find(filter).sort(sortObj).limit(+limit).skip((page - 1) * +limit).populate("user", "name username email");

    const totalCount = await Post.countDocuments(filter);

    const items = data.map((item) => {
      return {
        ...item.toObject(),
        img: `${process.env.BASE_URL}${item.img}`,
        createdAt: item.createdAt,
        user: {
          _id: item.user._id,
          name: item.user.name,
          username: item.user.username,
          email: item.user.email,
          avatar: item.user.avatar ? `${process.env.BASE_URL}${item.user.avatar}` : null,
        },
      }
    })

    res.json({
      message: "Posts found",
      totalCount,
      page: +page,
      limit: +limit,
      items
    })
  } catch (e) {
    console.error(e);

    res.status(500).json({ message: "Server error getting posts." });
  }
};


const create = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { title, content, tags } = req.body;
    const tagsArray = tags?.split(",") ?? [];
    const img = req.file.path;
    console.log(req);
    
    const stringImg = String(img);
    const newImg = stringImg?.replaceAll("\\", "/");


    if (!title || !content || !tags || !req.file || !req.user) {
      return res.status(400).json({ error: "Missing required fields." });
    }


    const post = new Post({
      title,
      content,
      tags: tagsArray,
      img: newImg,
      user: req.user._id,
    });


    await post.save();


    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: post,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error post creation." });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: "Post deleted successfully",
      data: post,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while removing the post' });
  }
};


export const update = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user._id.toString() !== post.user.toString()) {
      return res.status(403).json({ message: 'You can not update this post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.updatedAt = Date.now();

    if (req.file) {
      post.img = req.file.path;
    }

    await post.save();

    return res.status(200).json({ message: 'Post updated successfully', post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while updating' });
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return res.status(200).json({ message: `Post ${isLiked ? "Disliked" : "Liked"} successfully` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while liking' });
  }
}


export default {
  getAll,
  create,
  remove,
  update,
  like
}