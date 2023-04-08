// const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// const sequelize = require('../config/config');

// // create our User model
// class User extends Model {
//   // set up method to run on instance data (per user) to check password
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4]
//       }
//     }
//   },
//   {
//     hooks: {
//       // set up beforeCreate lifecycle "hook" functionality
//       beforeCreate: async (newUserData) => {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//         return updatedUserData;
//       }
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'user'
//   }
// );

// module.exports = User;


const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// create User model
class User extends Model{
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    };
};

// define table columns and configuration
User.init(
    // table column definitions
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true, 
                msg: "This username is already taken!",
            },
        }, 
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "You must enter a valid email address!",
                },
            },
            unique: {
                args: true, 
                msg: "This username is already taken!",
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6],
                    msg: "Your password must contain at least 6 characters!"
                },
            },
        },
    }, 
    // table config options 
    {
        hooks: {
            // functionality to hash password before it is saved into database
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // hash password after it is updated and before it is re-saved into database
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        }, 
        sequelize, 
        timestamps: false, 
        freezeTableName: true,
        underscored: true, 
        modelName: "user"
    }
);

// exports
module.exports = User;
