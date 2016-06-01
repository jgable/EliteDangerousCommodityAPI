module.exports = (sequelize, TYPES) => {
  var Commodity = sequelize.define('Commodity', {
    id: {type: TYPES.INTEGER, primaryKey: true},
    name: {type: TYPES.STRING},
    average_price: {type: TYPES.INTEGER},
    is_rare: {type: TYPES.BOOLEAN},
  }, {underscored: true});

  return Commodity;
};
