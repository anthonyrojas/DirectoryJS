'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First name is required.'
            },
            notEmpty: {
                msg: 'First name is required.'
            },
            isAlpha: {
                msg: 'First name must consist of alphabetical characters only.'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Last name is required.'
            },
            notEmpty: {
                msg: 'Last name is required.'
            },
            isAlpha: {
                msg: 'Last name must consist of alphabetical characters only.'
            }
        }
    },
    middleInitial: {
        type: DataTypes.STRING(2),
        allowNull: true,
        validate: {
            len: {
                args: [0,2],
                msg: 'Middle initial(s) must not be longer than 2 characters.'
            }
        }
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    suffix: {
        type: DataTypes.STRING(5),
        allowNull: true,
        validate: {
            len: {
                args: [0,5],
                msg: 'Suffix cannot exceed 5 characters.'
            }
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.belongsTo(models.Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
    Person.hasMany(models.Contact, { onDelete: 'CASCADE' });
  };
  return Person;
};