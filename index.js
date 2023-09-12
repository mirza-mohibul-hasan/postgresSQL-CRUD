const express = require("express");
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const pool = require("./db")

const app = express();
const PORT = 5001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//GET METHOD /book-> return all the books
app.get("/books", async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM book")
        res.status(200).json({ message: "books are returned", data:books.rows })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET METHOD /book/:id-> return a specific book
app.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleBook = await pool.query("SELECT * FROM book WHERE id=$1",[id])
        res.status(200).json({ message: "book is returned", data:singleBook.rows })
    } catch (error) {
        res.json({ error: error.message })
    }
})

//POST METHOD /book-> create a book
app.post("/books", async (req, res) => {
    try {
        const { name, description } = req.body;
        const id = uuidv4();

        // Insert into database
        const newbook = await pool.query("INSERT INTO book(id, name, description) VALUES ($1, $2, $3) RETURNING *", [id, name, description])

        res
            .status(201)
            .json({ message: `book created`, data: newbook.rows})
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Delete METHOD /book/:id-> delete a specific book
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await pool.query("DELETE FROM book WHERE id=$1",[id])
        res.status(200).json({ message: "deleted book"})
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Update METHOD /book/:id-> update a specific book
app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedBook = await pool.query("UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *",[name, description, id])
        res.status(200).json({ message: `book is updated`, data:updatedBook.rows })
    } catch (error) {
        res.json({ error: error.message })
    }
})

// Defaults
app.get("/", (req, res) => {
    res.send("Server is running")
})
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
});

//GET METHOD /book-> return all the books
//GET METHOD /book/:id-> return a specific book
//DELETE METHOD /book:id-> delete a specific book
//POST METHOD /book-> create a book
//PUT METHOD /book/:id-> update a book