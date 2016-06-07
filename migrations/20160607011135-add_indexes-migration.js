'use strict';

module.exports = {
  up: function (queryInterface) {
    queryInterface.addIndex(
      'Systems',
      ['x']
    );
    queryInterface.addIndex(
      'Systems',
      ['y']
    );
    queryInterface.addIndex(
      'Systems',
      ['z']
    );

    queryInterface.addIndex(
      'Stations',
      ['system_id']
    );

    queryInterface.addIndex(
      'StationCommodityListings',
      ['station_id', 'commodity_id']
    );
  },

  down: function (queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    queryInterface.removeIndex(
      'Systems',
      ['x']
    );
    queryInterface.removeIndex(
      'Systems',
      ['y']
    );
    queryInterface.removeIndex(
      'Systems',
      ['z']
    );

    queryInterface.removeIndex(
      'Stations',
      ['system_id']
    );

    queryInterface.removeIndex(
      'StationCommodityListings',
      ['station_id', 'commodity_id']
    );
  },
};
