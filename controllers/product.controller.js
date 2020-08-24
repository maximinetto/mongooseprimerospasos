var mongoose = require('mongoose');
const Product = require('../models/product.model');
const Brand = require('../models/brand.model');

exports.test = function (req, res) {
    res.send('Hola producto');
};

exports.product_new = function (req, res) {
     res.sendFile('/views/new.html', { root: '.' })
};

exports.list = function (req, res) {
	res.sendFile('/views/list.html', { root: '.' });
}

exports.product_create = function (req, res) {
	console.log(req.body);

	var brand = new Brand(
        {
        	_id: new mongoose.Types.ObjectId(),
            name: req.body.brand
        }
    );
    brand.save(function (err) {
        if (err) {
            //return next(err);
            console.log(err);
            res.send('Error');
        }

        var product = new Product(
	        {
	        	_id: new mongoose.Types.ObjectId(),
	            name: req.body.name,
	            price: req.body.price,
	            brand: brand._id,
	        }
	    );

	    product.save(function (err) {
	        if (err) {
	            //return next(err);
	            console.log(err);
	            res.send('Error');
	        }
	        //res.send('Product Created successfully');
	        res.render('respuesta.ejs', {producto: product,
	        	marca:brand})
	    })
    })
};

exports.all_products = function(req, res){
	Product.find()
		   .populate('brand')
	       .lean()
	       .then((products) => res.send(products));
}

exports.product_details = function (req, res) {
	console.log(req.params);
    Product.findById(req.params.id, function (err, prod) {
        if (err) {
        	console.log(err);
	            res.send('Error');
        }
        res.send(prod);
    })
};

exports.update_product = async function (req, res){
	const {id} = req.params;
	const {name, price, brand} = req.body;

	let newBrand = new Brand({
		_id: new mongoose.Types.ObjectId(),
        name: brand
	})

	const oldBrand = await Brand.findOne({
		name: brand
	})
	.lean();

	
	newBrand = !oldBrand ? await newBrand.save() : oldBrand;
	

	const product = await Product.findOneAndUpdate({_id: id},{
		name, price, brand: newBrand._id
	}, { new: true});

	res.json(product);

}