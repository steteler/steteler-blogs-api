const { post } = require('../services');

async function createPost(req, res) {
  try {
    const postContent = req.body;
    const { id } = req.user;
    const object = { ...postContent, userId: id };
    const newPost = await post.create({ ...object });
    return res.status(201).json(newPost);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function getAll(_req, res) {
  try {
    const allPosts = await post.getAll();
    return res.status(200).json(allPosts);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const postById = await post.getById(id);
    if (!postById) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(postById);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;

    const findPost = await post.getById(id);
    if (!findPost) return res.status(404).json({ message: 'Post does not exist' });

    const { userId } = findPost;
    const { id: reqId } = req.user;
    if (userId !== reqId) return res.status(401).json({ message: 'Unauthorized user' });

    const content = req.body;
    await post.update(id, content);

    const blogPost = await post.getById(id);
    return res.status(200).json(blogPost);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const findPost = await post.getById(id);
    if (!findPost) return res.status(404).json({ message: 'Post does not exist' });

    const { userId } = findPost;
    const { id: reqId } = req.user;
    if (userId !== reqId) return res.status(401).json({ message: 'Unauthorized user' });

    await post.remove(id);
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

async function search(req, res) {
  const { q } = req.query;
  const result = await post.search(q);
  res.status(200).json(result);
}

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  remove,
  search,
};