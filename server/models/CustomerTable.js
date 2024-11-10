module.exports = (sequelize, DataTypes) => {
    const CustomerTable = sequelize.define("CustomerTable", {
        chassisNumber: {
            type: DataTypes.STRING(255),
            allowNull: false,

        },
        dealerCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING(255),
        allowNull: false,
        },
        emailId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pincode: {
            type: DataTypes.STRING(255),
        allowNull: false,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false,
            
        },
        dist: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return CustomerTable;
};