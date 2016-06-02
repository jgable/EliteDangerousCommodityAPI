const {
  CommodityImporter,
  SystemImporter,
  StationImporter,
  StationCommodityListingImporter
} = require('../importers');
const path = require('path');
const {sequelize} = require('../models');

const dataFilePath = (fileName) => path.join(process.cwd(), 'data', fileName);

sequelize
  .sync()
  .then(() => CommodityImporter.FromFile(dataFilePath('commodities.json')).import())
  .then(() => SystemImporter.FromFile(dataFilePath('systems.json')).import())
  .then(() => StationImporter.FromFile(dataFilePath('stations.json')).import())
  .then(() => StationCommodityListingImporter.FromFile(dataFilePath('listings.csv')).import())
  .then(() => console.log('Done!'))
  .catch((err) => {
    console.log('Error');
    console.log(err);
  });
