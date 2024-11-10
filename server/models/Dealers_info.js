module.exports = (sequelize, DataTypes) => {
    const DealersInfo = sequelize.define("DealersInfo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LOIreferenceId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        RQreferenceId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        activationCode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dealerCode: {  // Add this field
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mobileNo: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        gstin: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dist: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pinCode: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        rtoOffice: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return DealersInfo;
};