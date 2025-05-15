# 📚 API REST de Libros, Autores y Categorías

## 📖 Descripción del Proyecto
Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **MongoDB**, orientada a la gestión de libros, autores y categorías. Permite realizar operaciones CRUD completas para cada entidad, así como gestionar las relaciones entre ellas (por ejemplo, un autor con sus libros o libros por categoría).

Además, integra **Cloudinary** para la gestión de imágenes (como portadas de libros), con almacenamiento en carpetas dinámicas según el autor. El proyecto está preparado para pruebas con herramientas como **Insomnia** o **Postman**, y protegido mediante autenticación con **JWT**.

## 🛠️ Tecnologías Utilizadas
Node.js
Express.js
MongoDB (con Mongoose)
JavaScript 
Jsonwebtoken (autenticación)
Dotenv (variables de entorno)
Cloudinary (almacenamiento de imágenes)
Multer + Multer-storage-cloudinary (subida de imágenes)
Insomnia para pruebas de endpoints

## 📂 Estructura del Proyecto
├── config/ # Configuración de base de datos
├── controllers/ # Lógica de los endpoints (autores, libros, categorías)
├── models/ # Esquemas de datos (authors, books, categories)
├── routes/ # Definición de rutas por entidad
├── data/ # Archivos de datos iniciales
├── middlewares/ # Autenticación, validaciones, subida a Cloudinary
├── utils/ # Funciones auxiliares (semillas, búsqueda de usuarios y eliminación de imágenes para que no se llene en exceso cloudinary con imágenes que ya no se utilicen)
├── .env # Variables de entorno
├── index.js # Punto de entrada de la aplicación
└── README.md # Documentación del proyecto



## 🧪 Endpoints y Funcionalidades
1. Autores (authors)
authorsRoutes.get("/", getAuthor);-> Obtener todos los autores
authorsRoutes.get("/:id", getAuthorById);-> Obtener un autor por ID
authorsRoutes.post("/", newAuthor);-> Crear un nuevo autor
authorsRoutes.put("/", putAuthor);-> Actualizar un autor existente
authorsRoutes.delete("/:id", deleteAuthor);-> Eliminar un autor

2. Libros (books)
booksRoutes.get("/", getBooks);-> Obtener todos los libros
booksRoutes.get("/:id", getBookById);-> Obtener un libro por ID
booksRoutes.get("/author", getBookByAuthor);-> Obtener un libro por autor
booksRoutes.get("/category", getBookByCategory);-> Ontener un libro por categoría
booksRoutes.post("/", upload.single("img"), newBook);-> Crear un nuevo libro
booksRoutes.put("/", putBook);-> Actualizar un libro existente
booksRoutes.delete("/:id", deleteBook);-> Eliminar un libro
**Nota:** Al crear un libro, se puede subir una imagen que se almacenará en una carpeta dinámica en Cloudinary basada en el nombre del autor.

3. Categorías (categories)
categoriesRoutes.get("/", getCategories);-> Obtener todas las categorías
categoriesRoutes.get("/:id", getCategoriesById);-> Obtener una categoría por ID
categoriesRoutes.post("/", newCategories);-> Crear una nueva categoría
categoriesRoutes.put("/", putCategories);-> Actualizar una categoría existente
categoriesRoutes.delete("/", deleteCategories);-> Eliminar una categoría


## 🔐 Autenticación y Autorización

El proyecto incluye middlewares para:

- **Auth**: Verifica si el usuario está autenticado mediante JWT.
- **Admin**: Permite restringir ciertas rutas a usuarios administradores.


## ☁️ Subida de Imágenes con Cloudinary

Las imágenes (como portadas de libros) se suben automáticamente a Cloudinary mediante `multer-storage-cloudinary`.  


## 🚀 Cómo Ejecutar
Clona el repositorio
Instala dependencias con npm install
Crea el archivo .env con tus datos
Ejecuta con: npm run dev


## 🧑‍💻 Autor
Este proyecto ha sido creado por Mónica Sánchez Carrillo como proyecto API con integración de backend, subida de imágenes y colecciones relacionadas.