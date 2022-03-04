const express = require('express') //importamos o express para const
const req = require('express/lib/request')
const routes = express.Router() //a const routes recebe so um parametro do express
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')


//Object Literals

//Rotas
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create) 
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes //exportamos o modulo para utilizar no server
