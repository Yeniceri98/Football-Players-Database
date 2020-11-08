const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Player = require('./models/player');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }))


// CONNECT TO MongoDB & MONGOOSE
const dbURI = 'mongodb+srv://ahmetyeniceri:janis1998@cluster0.vfwut.mongodb.net/football-players?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err))


// GETTING AND SAVING DATA
// app.get('/add-player', (req, res) => {
//     const player = new Player({
//         name: "Zlatan Ibrahimovic",
//         age: 38,
//         team: "Milan",
//         nationality: "Sweden"
//     })

//     player.save()
//         .then(result => res.send(result))
//         .catch(err => console.log(err))
// })


// ROUTES
app.get('/', (req, res) => {
    // const players = [
    //     { name: 'Messi',  age: 33, team: 'Barcelona', nationality: 'Argentina' },
    //     { name: 'Ronaldo',  age: 35, team: 'Juventus', nationality: 'Portugal' },
    //     { name: 'Neymar',  age: 28, team: 'PSG', nationality: 'Brasil' }
    // ]
    // res.render('home', { title: 'Player Info', players });

    res.redirect('/players');
})


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})




// PLAYER ROUTES
app.get('/players', (req, res) => {        // Players Index Get Request
    Player.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('home', { title: "Player Info" , players: result })
        })
        .catch(err => {
            console.log(err);
        })
})


app.get('/players/add', (req, res) => {     // Players Add Get Request
    res.render('addPlayer', { title: "Add a Player" })
})


app.post('/players', (req, res) => {        // Players Add Post Request (players/add kısmında submit yaptıktan sonra /players URL'sine Post request atacak)
    console.log(req.body);

    const player = new Player(req.body);
    player.save()
        .then(result => res.redirect('/players'))
        .catch(err => console.log(err))
})


app.get('/players/:id', (req, res) => {      // Player Details Get Request
    const id = req.params.id;
    console.log(id);
})


// 404 PAGE
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

