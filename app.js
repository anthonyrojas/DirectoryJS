require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./models/index');
const app = express();
// const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
const server = http.createServer(app);
// sequelize.authenticate()
// .then(()=>{
//     console.log('Connection successful!')
// })
// .catch(err => {
//     console.error('Unable to connect.', err);
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Enable CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
routes(app);

app.get('*', function(req, res, next) {
    var err = new Error('Invalid path. Page not found.');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    if(err.message){
        return res.status(400).json({message: err.message});
    }else{
        return res.status(500).json({message: 'Oops! Something went wrong'});
    }
});
db.sequelize.authenticate()
.then(()=>{
    console.log('authenticated');
}).catch(err => {
    console.error(err);
});
// db.sequelize.sync({force: true})
// .then(()=>{
//     console.log('Database updated!')
// })
// .catch(err => {
//     console.error(err);
// });
server.listen(process.env.SERVER_PORT || 5000, ()=>{
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});