// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/config');

// class Post extends Model {}

// Post.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     body: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date_created: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'user',
//         key: 'id',
//   },
//     }},
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'post',
//   }
// );

// module.exports = Post;


const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// create Post model
class Post extends Model { };

// define table columns and configuration
Post.init(
    // table column definitions
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING(3000),
            allowNull: false, 
        }, 
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user", 
                key: "id",
            },
        }
    },
    // table config options 
    {
        sequelize, 
        freezeTableName: true,
        underscored: true, 
        modelName: "post",
    },
);

// exports
module.exports = Post;
