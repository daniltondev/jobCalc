const express = require('express') //bibli  p/ criar o server
const server = express() //recebe o express que immportamos acima
const routes = require('./routes') //const recebe as rotas que criamos nessa pasta

//Ideia de template engine usando EJS (JS no HTML) npm i ejs
server.set('view engine', 'ejs')

//Habilita os arquivos estaticos
server.use(express.static('public'))

//Libera o req.body para poder enviar inf. pelo POST
server.use(express.urlencoded({ extended: true }))

//Routes
server.use(routes)

//Configura o server na porta
server.listen(3000, () => console.log('rodando'))
