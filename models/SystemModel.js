module.exports = (sequelize, TYPES) => {
  const System = sequelize.define('System', {
    id: {type: TYPES.INTEGER, primaryKey: true},
    name: {type: TYPES.STRING},
    x: {type: TYPES.FLOAT},
    y: {type: TYPES.FLOAT},
    z: {type: TYPES.FLOAT},
    faction: {type: TYPES.STRING},
    population: {type: TYPES.INTEGER},
    government: {type: TYPES.STRING},
    allegiance: {type: TYPES.STRING},
    state: {type: TYPES.STRING},
    security: {type: TYPES.STRING},
    primary_economy: {type: TYPES.STRING},
    power: {type: TYPES.STRING},
    power: {type: TYPES.STRING},
    needs_permit: {type: TYPES.BOOLEAN},
    updated_at: {type: TYPES.INTEGER},
    simbad_ref: {type: TYPES.STRING},
  }, {underscored: true});

  System.associate = ({Station}) => {
    System.hasMany(Station, {as: 'Stations'});
  };

  return System;
};
