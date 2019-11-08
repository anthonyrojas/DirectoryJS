const express = require('express');
const CompanyRouter = express.Router();
const PersonRouter = express.Router();
const ContactRouter = express.Router();

const PersonController = require('../controllers/PersonController');
const CompanyController = require('../controllers/CompanyController');
const ContactController = require('../controllers/ContactController');

module.exports = (app) => {
    app.use('/api/company', CompanyRouter);
    CompanyRouter.post('/', CompanyController.addCompany);
    CompanyRouter.get('/', CompanyController.listCompanies);
    CompanyRouter.get('/:id', CompanyController.getCompany);
    CompanyRouter.put('/:id', CompanyController.updateCompany);
    CompanyRouter.delete('/:id', CompanyController.deleteCompany)
    
    app.use('/api/person', PersonRouter);
    PersonRouter.post('/', PersonController.addPerson);
    PersonRouter.get('/', PersonController.listPeople);
    PersonRouter.get('/:id', PersonController.getPerson);
    PersonRouter.put('/:id', PersonController.updatePerson);
    PersonRouter.delete('/:id', PersonController.deletePerson)

    app.use('/api/contact', ContactRouter);
    ContactRouter.get('/', ContactController.listContacts);
    ContactRouter.get('/person/:personId', ContactController.getPersonContacts);
    ContactRouter.post('/', ContactController.addContact);
    ContactRouter.put('/:id', ContactController.updateContact);
    ContactRouter.delete('/:id', ContactController.deleteContact);
}