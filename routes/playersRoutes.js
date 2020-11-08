const express = require('express');
const playersController = require('../controller/playersController');


const router = express.Router();


router.get('/', playersController.players_index_get);
router.get('/add', playersController.players_add_get);
router.post('/', playersController.players_add_post);
router.get('/:id', playersController.players_details_get);
router.delete('/:id', playersController.players_details_delete);


module.exports = router;
