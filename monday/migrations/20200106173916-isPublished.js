'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn('Posts', 'isPublished', {
     type: Sequelize.BOOLEAN,
     defaultValue: true,
     allowNull: false
   }),
    queryInterface.addColumn('Posts', 'category', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.sequelize.transaction((t) => {
     return Promise.all([
       queryInterface.removeColumn('Posts', 'isPublished', {transaction: t}),
       queryInterface.removeColumn('Posts', 'category', {transaction: t})
     ])
   })
  }
};
