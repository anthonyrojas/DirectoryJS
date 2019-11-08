const db = require('../models/index');
const Sequelize = require('sequelize');
const Contact = db.Company;

exports.addContact = (req, res) => {
    Contact.create({
        phone: req.body.phone,
        email: req.body.email,
        note: req.body.note,
        personId: req.body.personId
    })
    .then(data => {
        return res.status(200).json({
            message: 'New contact added!',
            contact: data.toJson()
        });
    })
    .catch(error => {
        let eMessage = 'Unable to create contact.';
        if(error.name.includes(Sequelize.ValidationError.name)){
            eMessage += ' There are errors in your submission.';
        }
        let errorCollection = {};
        error.errors.forEach(element => {
            errorCollection[element.path] = element.message;
        });
        return res.status(400).json({
            message: eMessage,
            errors: errorCollection
        })
    });
}

exports.updateContact = (req, res) => {
    const contact = Contact.build({
        ...req.body,
        id: req.params.id
    });
    contact.update({
        ...req.body
    })
    .then(data => {
        return res.status(200).json({
            message: 'Contact updated!',
            contact: data
        })
    })
    .catch(error => {
        let eMessage = 'Unable to save changes to contact.';
        if(err.name.includes(Sequelize.ValidationError.name)){
            eMessage += ' There are errors in your submission.';
        }else{
            eMessage = error.message;
        }
        let errorCollection = {};
        if(error !== undefined && Array.isArray(error.errors)){
            error.errors.forEach(element => {
                errorCollection[element.path] = element.message;
            });
        }
        return res.status(400).json({
            message: eMessage,
            errors: errorCollection
        });
    })
}

exports.listContacts = (req, res) => {
    Contact.findAll({
        attributes: ['id', 'phone', 'email']
    })
    .then(data => {
        return res.status(200).json({
            contacts: data,
            message: 'Contacts retrieved!'
        })
    })
    .catch(error => {
        return res.status(500).json({
            contacts: [],
            message: 'Unable to retrieve contacts. Internal error.'
        });
    })
}

exports.getPersonContacts = (req, res) => {
    Contact.findAll({
        attributes: ['id', 'phone', 'email'],
        where: {
            personId: req.params.personId
        }
    })
    .then(data => {
        return res.status(200).json({
            contacts: data,
            message: 'Contacts retrieved!'
        })
    })
    .catch(error => {
        return res.status(500).json({
            contacts: [],
            message: 'Unable to retrieve contacts. Internal error.'
        });
    })
}

exports.deleteContact = (req, res) => {
    Contact.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        return res.status(200).json({
            message: `Contact with id ${req.params.id} deleted.`
        })
    })
    .catch(err => {
        return res.status(200).json({
            message: 'Internal error. Unable to delete at this time. ' + err.message
        })
    })
}