// models/ActivationCode.js

module.exports = (sequelize, DataTypes) => {
  const ActivationCode = sequelize.define("ActivationCode", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true  // Prevent table name from being pluralized
  });

  return ActivationCode;
};
