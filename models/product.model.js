var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    brand: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand'
    },
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);