'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postCategoriesTable = await queryInterface.createTable('posts_categories',
    {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      }
    });

    return postCategoriesTable;
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('posts_categories');
  }
};