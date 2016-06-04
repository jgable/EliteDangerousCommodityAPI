const {System, Commodity, StationCommodityListing} = require('../models');
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

        return this._getClosestSystems(origin, systems);
      })
      .then(({stations, systems}) => {
        if (_.isEmpty(stations)) {
          return Promise.reject(new Error('No stations found in range'));
        }

        return Commodity.findById(this.commodityId).then(commodity => ({
          commodities: commodity && [commodity],
          systems,
          stations,
        }));
      })
      .then(({stations, systems, commodities}) => {
        const systemsLookup = _.keyBy(systems, 'id');
        const results = _.chain(stations)
          .map(station => {
            const system = systemsLookup[station.system_id];
            return {
              systemDistance: system.distance,
              stationDistance: station.distance_to_star,
              system,
              station,
            };
          })
          .sortBy('stationDistance')
          .sortBy('systemDistance')
          .map(({station, system, systemDistance, stationDistance}) => ({
            stationId: station.id,
            systemId: system.id,
            systemDistance,
            stationDistance,
          }));

          return {stations, systems, commodities, results};
      });
  }

  _getClosestSystems(origin, systems) {
    const systemsLookup = _.keyBy(systems, 'id');

    const topSystems = _.chain(systems)
      .map(s => _.extend(s.toJSON(), {distance: s.distanceTo(origin)}))
      .sortBy('distance')
      .take(10)
      .value();

    return this._loadStationsInSystems(topSystems.map(s => systemsLookup[s.id]))
      .then(stations => ({stations, systems: topSystems}));
  }

  _loadStationsInSystems(systems) {
    const stationLoads = systems.map(s => s.getStations({
      include: [{
        attributes: ['id', 'name'],
        model: Commodity,
        through: {
          attributes: ['id', 'buy_price', 'supply'],
          where: {
            commodity_id: this.commodityId,
            buy_price: { $gt: 0 },
          },
        },
      }],
    }));

    return Promise.all(stationLoads).then(stationResults => _.flatten(stationResults));
  }
}

module.exports = CommoditySearch;
