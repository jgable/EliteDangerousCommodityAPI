const {System, Station, Commodity} = require('../models');
const JSONImporter = require('./JSONImporter');

module.exports = {
  CommodityImporter: {
    FromFile: JSONImporter.FromFile.bind(null, Commodity),
    FromWeb: JSONImporter.FromWeb.bind(null, Commodity),
  },
  SystemImporter: {
    FromFile: JSONImporter.FromFile.bind(null, System),
    FromWeb: JSONImporter.FromWeb.bind(null, System),
  },
  StationImporter: {
    FromFile: JSONImporter.FromFile.bind(null, Station),
    FromWeb: JSONImporter.FromWeb.bind(null, Station),
  },
}
