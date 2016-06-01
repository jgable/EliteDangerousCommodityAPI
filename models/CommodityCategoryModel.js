module.exports = (sequelize, TYPES) => {
  const CommodityCategory = sequelize.define('CommodityCategory', {
    id: {type: TYPES.INTEGER, primaryKey: true},
    name: {type: TYPES.STRING},
  }, {underscored: true});

  CommodityCategory.associate = ({Commodity}) => {
    CommodityCategory.hasMany(Commodity);
  };

  return CommodityCategory;
};
