const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const playersRoutes = require('./routes/playersRoutes');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }))


// CONNECT TO MongoDB & MONGOOSE
const dbURI = 'mongodb+srv://ahmetyeniceri:janis1998@cluster0.vfwut.mongodb.net/football-players?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err))


// ROUTES
app.get('/', (req, res) => {
    res.redirect('/players');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})


// PLAYERS ROUTES
app.use('/players', playersRoutes);    // Buradaki tanımlama sayesinde URL'ye /players otomatikman ekleneceği için, playersRouters.js'de /players yerine / yazarız. Başka bir örnek olarak /players/addPlayer yerine sadece /addPlayer yazarız


// 404 PAGE
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

