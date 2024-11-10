module.exports = (sequelize, DataTypes) => {
  const AdminLogin = sequelize.define("AdminLogin", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",  // Default userId
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin@003",  // Default password
    },
  }, {
    timestamps: false,
    freezeTableName: true,  // Prevent table name from being pluralized
  });

  return AdminLogin;
};
