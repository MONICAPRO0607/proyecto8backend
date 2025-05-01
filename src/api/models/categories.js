const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  img: {type: String, required: true},
  gender: {type: String, required: true, enum: [
    "Ficción",
    "No ficción",
    "Misterio",
    "Ciencia ficción",
    "Fantasía",
    "Biografía",
    "Autoayuda",
    "Romance",
    "Histórica",
    "Juvenil",
    "Infantil",
    "Aventura",
    "Terror",
    "Poesía",
    "Novela",
    "Clásico",
    "Humor",
    "Drama",
    "Crimen",
    "Ensayos",
    "Cuentos cortos"
  ],
},
}, {
  timestamps: true,
  collection: "categorias",
});

const categories = mongoose.model("categorias", categoriesSchema, "categorias");
module.exports = categories;