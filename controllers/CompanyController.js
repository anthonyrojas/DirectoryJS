const db = require('../models/index');
const Sequelize = require('sequelize')
const Company = db.Company;
const Person = db.Person;

exports.addCompany = (req, res) => {
    Company.create({
        name: req.body.name,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        shortDescription: req.body.shortDescription
    })
    .then(saved => {
        return res.status(200).json({ message: 'New company added!', model: saved.toJSON()});
    })
    .catch(error => {
        let eMessage = 'Unable to save changes to company.';
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
    })
}

exports.updateCompany = (req, res) => {
    const company = Company.build({
        ...req.body,
        id: req.params.id
    });
    company.update({...req.body})
    .then(data => {
        return res.status(200).json({
            person: data,
            message: 'Company updated!'
        })
    })
    .catch(error => {
        let eMessage = 'Unable to save changes to company.';
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

exports.listCompanies = (req, res) => {
    Company.findAll({
        attributes: ['id', 'name']
    })
    .then(data => {
        return res.status(200).json({
            companies: data,
            message: 'Companies retrieved!'
        })
    })
    .catch(error => {
        return res.status(500).json({
            companies: [],
            message: 'Unable to retrieve companies. Internal error.'
        })
    });
}
exports.getCompany = (req, res) => {
    Company.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            include: [[Sequelize.fn('COUNT', Sequelize.col('People.id')), 'peopleCount']]
        },
        include: [
            {
                model: Person,
                attributes: ['id', 'firstName', 'lastName', 'middleInitial', 'suffix', 'position']
            }
        ],
        group: ['People.id']
    })
    .then(data => {
        return res.status(200).json({
            company: data,
            message: 'Company retrieved!'
        });
    })
    .catch(err => {
        return res.status(404).json({
            company: null,
            message: err.message
        })
    })
}

exports.deleteCompany = (req,res) => {
    Company.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        return res.status(200).json({
            message: `Company with id ${req.params.id} deleted.`
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Internal error. Unable to delete at this time.' + err.message
        })
    })
}