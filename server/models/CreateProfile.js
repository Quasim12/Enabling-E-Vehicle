module.exports = (sequelize, DataTypes) => {
  const CreateProfile = sequelize.define("CreateProfile", {
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobileNumber: { 
      type: DataTypes.STRING(15), 
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(6), // Pincode typically has a fixed length
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  return CreateProfile;
};
