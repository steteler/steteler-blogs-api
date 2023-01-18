const { 
    BlogPost,
    PostCategory,
    User, Category,
    sequelize,
    Sequelize,
  } = require('../models');

const { or, like } = Sequelize.Op;

async function create(newPost) {
  try {
    const newPostCreated = await sequelize.transaction((async (t) => {
      const post = await BlogPost.create({ ...newPost }, { transaction: t });

      const { categoryIds } = newPost;

      const allIds = categoryIds.map(async (id) => {
        const created = await PostCategory.create(
            { postId: post.id, categoryId: id },
            { transaction: t },
          );
        return created;
      });

      await Promise.all(allIds);

      return post;
    }));
    return newPostCreated;
  } catch (e) {
    console.log(e);
  }
}

async function getAll() {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  
    return posts;
  } catch (e) {
    console.log(e);
  }
}

async function getById(id) {
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return post;
  } catch (e) {
    console.log(e);
  }
}

async function update(id, updatedContent) {
  const updatedAt = new Date().getTime();

  const { title, content } = updatedContent;

  try {
    const [updatedPost] = await BlogPost.update({ title, content, updatedAt }, { where: { id } });
    return updatedPost;
  } catch (e) {
    console.log(e);
  }
}

async function remove(id) {
  try {
    await BlogPost.destroy({ where: { id } });
  } catch (e) {
    console.log(e);
  }
}

async function search(query) {
  try {
    const posts = await BlogPost.findAll(
      {
        where: {
          [or]: [
          { title: { [like]: `%${query}%` } },
          { content: { [like]: `%${query}%` } }] },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
    );
    return posts;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};