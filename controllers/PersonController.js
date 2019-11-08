const db = require('../models/index');
const Sequelize = require('sequelize');
const Person = db.Person;
const Company = db.Company;

exports.addPerson = (req, res) => {
    Person.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleInitial: req.body.middleInitial,
        suffix: req.body.suffix,
        nickname: req.body.nickname,
        position: req.body.position,
        companyId: req.body.companyId
    })
    .then(saved => {
        return res.status(200).json({ message: 'New person added!', model: saved.toJSON()});
    })
    .catch(error => {
        let eMessage = 'Unable to save changes to person.';
        if(error.name.includes(Sequelize.ValidationError.name)){
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
        return res.status(400).json({ message: eMessage, errors: errorCollection })
    })
}

exports.updatePerson = (req, res) => {
    const person = Person.build({
        ...req.body,
        id: req.params.id
    });
    person.update({...req.body})
    .then(data => {
        return res.status(200).json({
            person: data,
            message: 'Person updated!'
        })
    })
    .catch(error => {
        let eMessage = 'Unable to save changes to person.';
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

exports.listPeople = (req, res) => {
    Person.findAll({
        attributes: ['id', 'firstName', 'lastName', 'middleInitial']
    })
    .then(data => {
        return res.status(200).json({
            message: 'People retrieved!',
            people: data
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Internal error. Unable to retrieve people at this time.'
        })
    })
}

exports.deletePerson = (req, res) => {
    Person.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        return res.status(200).json({
            message: `Person with id ${req.params.id} deleted.`
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Internal error. Unable to delete this person at this time.' + err.message
        })
    })
}

exports.getPerson = (req, res) => {
    Person.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Company,
            attributes: ['id', 'name']
        }]
    })
    .then(data => {
        return res.status(200).json({
            message: 'Person information retrieved!',
            person: data
        })
    })
    .catch(err => {
        return res.status(404).json({
            message: err.message,
            person: null
        })
    })
}