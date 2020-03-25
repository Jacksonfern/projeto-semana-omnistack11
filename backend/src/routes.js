const express = require('express');

const ongController = require('./controllers/OngController');
const incidentControler = require('./controllers/IndicentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentControler.create);
routes.get('/incidents', incidentControler.index);
routes.delete('/incidents/:id', incidentControler.deletar);

routes.get('/profile/:id', profileController.index);
routes.post('/session', sessionController.login);

module.exports = routes;