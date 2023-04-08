// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/config');

// class Comment extends Model {}

// Comment.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     comment: {
//       type: DataTypes.STRING,
//       allowNull: false
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

//       },
//     },
//     postId:
//     {

//       type: DataTypes.INTEGER,
//       references: {
//         model: 'post',
//         key: 'id',
//   },
//   }
//   },
//   {
    
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'comment',
//   }
// );

// module.exports = Comment;


const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// create the Comment model
class Comment extends Model { };

// define table columns and configuration
Comment.init(
    // table column definitions
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        }, 
        comment_text: {
            type: DataTypes.STRING(3000),
            allowNull: false,
            validate: {
                len: {
                    args: [1],
                    msg: "Your comment must contain at least one character!",
                }
            },
        },
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: "user",
                key: "id",
            },
        },
        post_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: "post", 
                key: "id",
            }
        }
    },
    // table config options 
    {
        sequelize, 
        freezeTableName: true, 
        underscored: true, 
        modelName: "comment",
    },
);

// exports
module.exports = Comment;
