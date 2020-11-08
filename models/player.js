const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Player = mongoose.model('player', playerSchema);    
module.exports = Player;


/*
    const Player = mongoose.model('player', playerSchema) KISMI:
    
    Cluster > Collections > Database (football-players) kısmının altında collection name (players) var. Bunları en başta setup yaparken tanımlıyorduk
    Burada "player" dersek de players'ın olduğu kısma kaydeder. Çünkü Mongoose default olarak çoğul isim kullanır. Yani player da desek players da desek aynı sonucu verir
    Eğer buraya "player2" gibi farklı bir isim verirsek, database'in altında yeni bir collection name oluşur ve eklediğimiz veri orada gözükür

    "player" şeklinde kaydettikten sonra, URL'de player-add kısmına gelip ana sayfaya geri dönersek "player" ın içinde olan verileri görürüz
    Aynı işlemi "player2" şeklinde kaydedip yaparsak da "player2" nin içinde olan verileri görürüz
    Bunları MongoDB Atlas sayfasında da gözlemleyebiliriz


    NOT: Örneğin "deneme" yazsak bile MongoDB Atlas'ta "denemes" olarak oluşturur. Yani otomatikman çoğullaştırır
    NOT: Yazılan şeyde büyük-küçük harf duyarlılığı yoktur. Nasıl yazarsak yazalım collection type tamamen küçük harflerle oluşur
*/ 


