'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'Company name required.'
            },
            notEmpty: {
                msg: 'Company name required.'
            }
        }
    },
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Street address required.'
            },
            notEmpty: {
                msg: 'Street address required.'
            }
        }
    },
    city: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'City required.'
            },
            notEmpty: {
                msg: 'City required.'
            }
        }
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            len: {
                args: [2,2],
                msg: 'Must provide the 2-digit state code.'
            },
            isAlpha: {
                msg: 'State must consist of only alphabetical characters.'
            },
            notNull: {
                msg: 'State required.'
            },
            notEmpty: {
                msg: 'State required.'
            }
        }
    },
    zipcode: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
            len: {
                args: [5,5],
                msg: 'Zipcode must be 5 characters long.'
            },
            isNumeric: {
                msg: 'Zipcode must consist of only numbers.'
            },
            notNull: {
                msg: 'Zipcode required.'
            },
            notEmpty: {
                msg: 'Zipcode required.'
            }
        }
    }
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.Person, { onDelete: 'CASCADE' });
  };
  return Company;
};