var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Brand', BrandSchema);