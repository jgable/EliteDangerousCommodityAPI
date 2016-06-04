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
    needs_permit: {type: TYPES.BOOLEAN},
    updated_at: {type: TYPES.INTEGER},
    simbad_ref: {type: TYPES.STRING},
  }, {
    classMethods: {
      findInRadius(originSystemId, radius) {
        return System.findById(originSystemId)
          .then(originSystem => {
            if (!originSystem) {
              throw new Error(`System not found; (${originSystemId})`);
            }

            const {x, y, z} = originSystem;
            const ranges = {
              x: [x - radius, x + radius],
              y: [y - radius, y + radius],
              z: [z - radius, z + radius],
            };

            return System.findAll({
              attributes: [
                'id',
                'name',
                'x',
                'y',
                'z',
              ],
              where: {
                x: {
                  $between: ranges.x,
                },
                y: {
                  $between: ranges.y,
                },
                z: {
                  $between: ranges.z,
                },
              },
            }).then(systems => ({
              origin: originSystem,
              systems,
            }));
          });
      },
    },
    instanceMethods: {
      distanceTo({x, y, z}) {
        return Math.sqrt(
          Math.pow(this.x - x, 2) +
          Math.pow(this.y - y, 2) +
          Math.pow(this.z - z, 2)
        );
      },
    },
    getterMethods: {
      distanceToSol() {
        return this.distanceTo({x: 0, y: 0, z: 0});
      },
    },
    underscored: true,
  });

  System.associate = ({Station}) => {
    System.hasMany(Station, {as: 'Stations'});
  };

  return System;
};
