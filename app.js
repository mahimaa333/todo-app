const express = require('express');
const app = express();
const port = 3000;
var todoController = require('./controllers/todoController');

//set up the template engine
app.set('view engine','ejs');
//static files
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//controllers
todoController(app);

app.listen(3000);
console.log('Hey!! listening to port 3000');








