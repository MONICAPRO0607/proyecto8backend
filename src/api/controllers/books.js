const Book = require('../models/books');
const Author = require("../models/authors");
const { deleteImgCloudinary } = require('../../utils/deleteImgCloudinary');

// Función para obtener todos los libros
const getBooks = async (req, res, next) => {
  try {
    const allLibros = await Book.find().populate("author"); 
    // ESTO SE DEBE PONER SI SE RELACIONAN LAS COLECCIONES
    return res.status(200).json(allLibros);
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener los libros', error: error.message })
  }
};

// Función para obtener 1 libro por ID
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params
    const libro = await Book.findById(id)
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error al obtener el libro por ID')
  }
};

// Función para obtener libro por autor
const getBookByAuthor = async (req, res, next) => {
  try {
    const { author } = req.params
    const libro = await Book.find({ author: author })
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener el libro por autor',
      message: error.message
    })
  }
};

// Función para obtener libro por categoría: getBookByCategory
const getBookByCategory = async (req, res, next) => {
  try {
    const { genre } = req.params
    const genreFormatted =
      genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
    const libro = await Book.find({ genre: genreFormatted })
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error al obtener el libro por categoría')
  }
};
// Función para crear un libro: create o newLibro (post)
const newBook = async (req, res, next) => {
  try {
    const { title, gender, author } = req.body;

    // Validación: ¿Existe el autor?
    const foundAuthor = author ? await Author.findById(author) : null;

    if (author && !foundAuthor) {
      return res.status(400).json({message: "El autor especificado no existe",
      });
    }

    // Crear nuevo libro con la imagen (si viene)
    const newBook = new Book({
      title,
      gender,
      author: author || null,
      img: req.file?.path,
    });

    const bookSaved = await newBook.save();

    // Agregar el libro al autor
    if (foundAuthor) {
      foundAuthor.books.push(bookSaved._id);
      await foundAuthor.save();
    };

    return res.status(201).json(bookSaved);
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear un nuevo libro",
      error: error.message,
    });
  }
};

const putBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedData = req.body // Suponemos que los datos a actualizar están en req.body

    // Si el campo que contiene el array relacionado está en `relatedArray` (por ejemplo),
    // podemos usar el operador $addToSet para asegurarnos de que no haya duplicados

    const libroUpdate = await Book.findByIdAndUpdate(
      id,
      {
        $set: updatedData, // Actualizamos los otros campos del libro
        $addToSet: {
          // Usamos $addToSet para evitar duplicados en el array
          relatedArray: { $each: updatedData.relatedArray || [] } // Si hay elementos en relatedArray, los agregamos
        }
      },
      { new: true }
    )

    if (!libroUpdate) {
      return res.status(404).json({
        message: 'Libro no encontrado',
        error: error.message
      })
    }

    return res.status(200).json(libroUpdate)
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Error al editar el libro',
      error: error.message
    })
  }
}
// deleteLibro
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscar el libro antes de eliminarlo
    const bookToDelete = await Book.findById(id);

    if (!bookToDelete) {
      return res.status(404).json({ message: "Libro no encontrado" });
    };

    // Eliminar imagen de Cloudinary
    if (bookToDelete.img) {
      await deleteImgCloudinary(bookToDelete.img);
    };

    // Eliminar el libro de la base de datos
    await Book.findByIdAndDelete(id);

    // Eliminar referencia del libro en el autor, si tiene uno
    if (bookToDelete.author) {
      await Author.findByIdAndUpdate(
        bookToDelete.author,
        { $pull: { books: bookToDelete._id } },
        { new: true }
      );
    };

    return res.status(200).json( {message: "Libro eliminado correctamente", deletedBook: bookToDelete,
    });
  } catch (error) {
    return res.status(400).json('Error al eliminar el libro');
  }
};

module.exports = {
  getBooks,
  getBookById,
  getBookByAuthor,
  getBookByCategory,
  newBook,
  putBook,
  deleteBook
};
