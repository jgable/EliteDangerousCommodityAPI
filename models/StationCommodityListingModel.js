module.exports = (sequelize, TYPES) => {
  const StationCommodityListing = sequelize.define('StationCommodityListing', {
    id: {type: TYPES.INTEGER, primaryKey: true},
    supply: {type: TYPES.INTEGER},
    buy_price: {type: TYPES.DECIMAL},
    sell_price: {type: TYPES.DECIMAL},
    demand: {type: TYPES.DECIMAL},
    collected_at: {type: TYPES.INTEGER},
    update_count: {type: TYPES.INTEGER}
  }, {underscored: true});

  return StationCommodityListing;
};
