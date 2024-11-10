module.exports = (sequelize, DataTypes) => {
  const VehicleTable = sequelize.define(
    "VehicleTable",
    {
      dealerNameDealerCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      chassisNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Ensure chassisNo is unique
      },
      bodyType: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      batteryVolt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batteryCompany: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      batteryAH: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batteryWarranty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      charger: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isUsed: { // New field to track usage of chassisNumber
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default value is false, indicating it's not used
      },
      
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return VehicleTable;
};