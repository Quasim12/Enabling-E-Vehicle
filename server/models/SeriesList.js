// SeriesList model code

module.exports = (sequelize, DataTypes) => {
  const SeriesList = sequelize.define("SeriesList", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    seriesName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false,
    freezeTableName: true  // Prevent table name from being pluralized
  });

  return SeriesList;
};
