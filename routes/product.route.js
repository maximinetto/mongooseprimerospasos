const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const product_controller = require('../controllers/product.controller');


function helper(callback){
    return async (req, res, next) => {
        try{
            await callback(req, res);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err);
        }
    }
}

// Prueba
router.get('/test', product_controller.test);

router.get('/new', product_controller.product_new);

router.post('/create', product_controller.product_create);

router.get('/list', product_controller.list);

router.get('/all', product_controller.all_products);

router.get('/:id', product_controller.product_details);

router.put('/:id', helper(product_controller.update_product));


module.exports = router;
