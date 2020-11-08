const Player = require('../models/player');


const players_index_get = (req, res) => {         // Players_Index_GET_Request
    Player.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('home', { title: "Player Info" , players: result })
    })
    .catch(err => console.log(err));
}

const players_add_get = (req, res) => {            // Players_Add_GET_Request
    res.render('addPlayer', { title: "Add a Player" })
}

const players_add_post = (req, res) => {           // Players_Add_POST_Request (players/add kısmında submit yaptıktan sonra /players URL'sine Post request atacak)
    console.log(req.body);

    const player = new Player(req.body);
    player.save()
        .then(result => res.redirect('/players'))
        .catch(err => console.log(err))
}

const players_details_get = (req, res) => {        // Players_Details_GET_Request
    const id = req.params.id;
    console.log(id);

    Player.findById(id)
        .then(result => {
            res.render('playerDetails', { title: 'Player Details', player: result });
        })
        .catch(err => console.log(err))
}

const players_details_delete = (req, res) => {     // Players_Details_DELETE_Request
    const id = req.params.id;
    console.log(id);

    Player.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/players' });
        })
        .catch(err => console.log(err));
}


module.exports = {
    players_index_get,
    players_add_get,
    players_add_post,
    players_details_get,
    players_details_delete
}