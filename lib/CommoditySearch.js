const {System, Station, StationCommodityListing, Commodity} = require('../models');
const _ = require('lodash');

class CommoditySearch {
  constructor(originSystemId, commodityId, range) {
    _.extend(this, {originSystemId, commodityId, range});
    this.search = this.search.bind(this);
  }

  search() {
    return System.findInRadius(this.originSystemId, this.range)
      .then(({origin, systems}) => {
        if (_.isEmpty(systems)) {
          return Promise.reject(new Error('No systems found in range'));
        }

        const systemIds = _.map(systems, 'id');

        const stationQuery = Station.findAll({
          // TODO: Where has commodity market and commodity for sale
          // TODO: Limit to closest 5 or something
          where: {
            system_id: {
              $in: systemIds,
            },
          },
        });

        return stationQuery.then(stations => ({
          origin,
          systems,
          stations,
        }));
      })
      .then(({origin, systems, stations}) => {
        if (_.isEmpty(stations)) {
          return Promise.reject(new Error('No stations found in range'));
        }

        const stationIds = _.map(stations, 'id');

        const listingQuery = StationCommodityListing.findAll({
          where: {
            commodity_id: this.commodityId,
            station_id: {
              $in: stationIds,
            },
          },
        });

        return listingQuery.then(listings => ({
          origin,
          systems,
          stations,
          listings,
        }));
      })
      .then(data => {
        return Commodity.findById(this.commodityId).then(commodity => _.extend(data, {commodity}));
      })
      .then(data => {
        // Build up the result
        const {origin, commodity, stations, systems, listings} = data;
        const systemsLookup = _.keyBy(systems, 'id');
        const listingsLookup = _.keyBy(listings, 'station_id');
        const results = _.chain(stations)
          .reduce((results, station) => {
            const system = systemsLookup[station.system_id];
            const listing = listingsLookup[station.id];

            if (listing) {
              results.push({
                commodityId: commodity.id,
                stationId: station.id,
                systemId: system.id,
                systemDistance: system.distanceTo(origin),
                stationDistance: station.distance_to_star,
                price: listing.buy_price,
              });
            }

            return results;
          }, [])
          .sortBy('price')
          .sortBy('stationDistance')
          .sortBy('systemDistance')
          .take(10)
          .value();

          return _.extend(data, {results});
      })
      .then(data => {
        const {systems, stations} = data;
        const systemsLookup = _.keyBy(systems, 'id');
        const stationsLookup = _.keyBy(stations, 'id');
        // Clean up the systems and stations to only ones with listings
        const systemsAndStations = data.results.reduce((memo, result) => {
          if (!memo.systems[result.systemId]) {
            memo.systems[result.systemId] = systemsLookup[result.systemId];
          }

          if (!memo.stations[result.stationId]) {
            memo.stations[result.stationId] = stationsLookup[result.stationId];
          }

          return memo;
        }, {
          systems: {},
          stations: {},
        });

        return _.extend(data, {
          systems: systemsAndStations.systems,
          stations: systemsAndStations.stations,
        });
      });
  }
}

module.exports = CommoditySearch;
