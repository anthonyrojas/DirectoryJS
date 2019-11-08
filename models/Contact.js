'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
        validate: {
            isNumeric: {
                msg: 'Phone number must consist of only numeric characters.'
            },
            len: {
                args: [7,12],
                msg: 'Phone number must be at least 7 digits and at most 12 digits.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Email required for contact.'
            },
            notEmpty: {
                msg: 'Email required for contact.'
            },
            isEmail: {
                msg: 'Email must be a valid format.'
            }
        }
    },
    note: {
        type: DataTypes.STRING
    }
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.belongsTo(models.Person, { foreignKey: 'personId', onDelete: 'CASCADE' });
  };
  return Contact;
};