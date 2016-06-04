const {System, Station, Commodity, StationCommodityListing} = require('../models');
const CSVImporter = require('./CSVImporter');
const JSONImporter = require('./JSONImporter');

const parseListingLine = item => {
  let {
    id,
    station_id,
    commodity_id,
    supply,
    buy_price,
    sell_price,
    demand,
    collected_at,
    update_count,
  } = item;

  return {
    id: parseInt(id, 10),
    station_id: parseInt(station_id, 10),
    commodity_id: parseInt(commodity_id, 10),
    supply: parseInt(supply, 10),
    buy_price: parseInt(buy_price, 10),
    sell_price: parseInt(sell_price, 10),
    demand: parseInt(demand, 10),
    collected_at: parseInt(collected_at, 10),
    update_count: parseInt(update_count, 10),
  };
}

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
  StationCommodityListingImporter: {
    FromFile: CSVImporter.FromFile.bind(null, StationCommodityListing, parseListingLine),
    FromWeb: CSVImporter.FromWeb.bind(null, StationCommodityListing, parseListingLine),
  },
}
