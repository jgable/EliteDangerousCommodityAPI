module.exports = (sequelize, TYPES) => {
  const Station = sequelize.define('Station', {
    id: {type: TYPES.INTEGER, primaryKey: true},
    name: {type: TYPES.STRING},
    max_landing_pad_size: {type: TYPES.STRING},
    distance_to_star: {type: TYPES.INTEGER},
    faction: {type: TYPES.STRING},
    government: {type: TYPES.STRING},
    allegiance: {type: TYPES.STRING},
    state: {type: TYPES.STRING},
    type_id: {type: TYPES.INTEGER},
    type: {type: TYPES.STRING},
    has_blackmarket: {type: TYPES.BOOLEAN},
    has_market: {type: TYPES.BOOLEAN},
    has_refuel: {type: TYPES.BOOLEAN},
    has_repair: {type: TYPES.BOOLEAN},
    has_rearm: {type: TYPES.BOOLEAN},
    has_outfitting: {type: TYPES.BOOLEAN},
    has_shipyard: {type: TYPES.BOOLEAN},
    has_docking: {type: TYPES.BOOLEAN},
    has_commodities: {type: TYPES.BOOLEAN},
    //import_commodities: [ 'Beer', 'Grain', 'Silver' ],
    //export_commodities: [ 'Hydrogen Fuel', 'Biowaste', 'Limpet' ],
    /*
    prohibited_commodities:
     [ 'Narcotics',
       'Tobacco',
       'Combat Stabilisers',
       'Imperial Slaves',
       'Slaves',
       'Personal Weapons',
       'Battle Weapons',
       'Toxic Waste',
       'Wuthielo Ku Froth',
       'Bootleg Liquor',
       'Landmines' ],
    */
    //economies: [ 'Service' ],
    updated_at: {type: TYPES.INTEGER},
    shipyard_updated_at: {type: TYPES.INTEGER},
    outfitting_updated_at: {type: TYPES.INTEGER},
    market_updated_at: {type: TYPES.INTEGER},
    is_planetary: {type: TYPES.BOOLEAN},
    /*
    selling_ships:
     [ 'Adder',
       'Asp Explorer',
       'Cobra Mk. III',
       'Diamondback Scout',
       'Hauler',
       'Python',
       'Sidewinder Mk. I',
       'Federal Corvette',
       'Cobra MK IV' ],
    */
    /*
    selling_modules:
     [ 738,
       739,
       740 ]
    */
  }, {underscored: true});

  Station.associate = ({System}) => {
    // TODO: StationCommodities
  };

  return Station;
};
