const express = require('express');
const bodyParser = require('body-parser');

// Importar las rutas de los productos
const product = require('./routes/product.route'); 
const app = express();


// Conexion a mongo
var mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/myapp';
mongoose.connect(url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json({
    type: ['application/json', 'text/plain']
}));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('html', require('ejs').renderFile)

app.use(express.static(__dirname + '/views'));


app.use('/products', product);

app.set('view engine', 'ejs')

const port = 1234;

app.listen(port, () => {
    console.log(`Server on port: ${port}`);
});