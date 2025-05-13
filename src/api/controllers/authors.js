const Authors = require('../models/authors')

// Función para obtener todos los autores
const getAuthors = async (req, res, next) => {
  try {
    const allAuthors = await Authors.find().populate("books");
    return res.status(200).json(allAuthors);
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener los autores', error: error.message });
  }
};

// Función para obtener 1 autor por ID
const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await author.findById(id).populate("books");

    if (!author) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    return res.status(200).json(author);
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener el autor por ID",
      error: error.message,
    });
  }
};

const newAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Authors(req.body);
    const authorSaved = await newAuthor.save();
    return res.status(201).json(authorSaved);
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el autor', error: error.message });
  }
};


// save o editAuthor (put)
const putAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newAuthor = new Authors(req.body);
    newAuthor.id= id;
    const authorUpdate = await Author.findByIdAndUpdate(id, newAuthor, { new:true });
    return res.status(200).json(authorUpdate);
  } catch (error) {
    return res.status(400).json('Error al actualizar el autor')
  }
};

// deleteAuthor
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorDeleted = await Authors.findByIdAndDelete(id);
    return res.status(200).json(authorDeleted);
  } catch (error) {
    return res.status(400).json('Error')
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  newAuthor,
  putAuthor,
  deleteAuthor
};
