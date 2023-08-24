'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.hasMany(
        models.Spot,
          { foreignKey: 'classId', onDelete: 'CASCADE', hooks: true }
      );
    }
  }
  Class.init({
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
