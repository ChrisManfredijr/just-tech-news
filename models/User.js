const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        //define an id column
        id: {
            //use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            
            //not null in SQL
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on autoincrement
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNuil is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        //table config options go here
        //pass in our imported sequilize connection (the direct connect to the database)
        sequelize,
        //dont auto create createdAt/updatedAt timestamps fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;
